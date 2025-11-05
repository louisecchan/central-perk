import React, { useCallback, useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import "./posPage.css";

// Helper function to detect mobile devices
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768;
};

const toastOptions = {
  autoClose: 400,
  // autoClose: 3000000,
  pauseOnHover: true,
};

function POSPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        "https://my-json-server.typicode.com/louisecchan/cafe-pos-json/products"
      );
      setProducts(result.data);
      
      // Preload images
      result.data.forEach((product) => {
        const img = new Image();
        img.src = product.image;
        img.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(product.image));
        };
      });
    } catch (error) {
      toast.error("Failed to fetch products", toastOptions);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addProductToCart = async (product) => {
    // check if the adding product exist
    let findProductInCart = await cart.find((i) => {
      return i.id === product.id;
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: Number(
              (Number(cartItem.price) * (cartItem.quantity + 1)).toFixed(2)
            ),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(
        <>
          Added <span className="toast-product-name">{product.name}</span> to
          cart
        </>,
        toastOptions
      );
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: Number(Number(product.price).toFixed(2)),
      };
      setCart([...cart, addingProduct]);
      toast(
        <>
          Added <span className="toast-product-name">{product.name}</span> to
          cart
        </>,
        toastOptions
      );
    }
  };

  const removeProduct = async (product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    if (isMobileDevice()) {
      // On mobile, show receipt in a modal/overlay instead
      setShowReceipt(true);
    } else {
      // On desktop, use normal print
      handleReactToPrint();
    }
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
  };

  const handleMobilePrint = () => {
    window.print();
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount += Number(icart.totalAmount);
    });
    setTotalAmount(Number(newTotalAmount.toFixed(2)));
  }, [cart]);

  return (
    <MainLayout>
      {/* Mobile Receipt Modal */}
      {showReceipt && (
        <div className="receipt-modal-overlay">
          <div className="receipt-modal">
            <button className="receipt-close-btn" onClick={handleCloseReceipt}>
              ✕
            </button>
            <ComponentToPrint
              cart={cart}
              totalAmount={totalAmount}
              ref={componentRef}
            />
            <div className="receipt-actions">
              <button className="btn-mobile-print" onClick={handleMobilePrint}>
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-lg-8">
          {isLoading ? (
            <div className="loading-spinner-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="row">
              {products.map((product, key) => (
                <div key={key} className="col-lg-4 mb-2">
                  <div
                    className="pos-item px-3 text-center"
                    onClick={() => addProductToCart(product)}
                  >
                    <h5 className="pt-3">{product.name}</h5>
                    <img
                      src={product.image}
                      className={`img-fluid rounded ${
                        loadedImages.has(product.image) ? "image-loaded" : "image-loading"
                      }`}
                      alt={product.name}
                    />
                    <p className="p-3">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-lg-4">
          <div style={{ display: "none" }}>
            <ComponentToPrint
              cart={cart}
              totalAmount={totalAmount}
              ref={componentRef}
            />
          </div>
          <div className="calculator container">
            <div className="bg-dark rounded container-calculator">
              <table className="table table-light rounded">
                <thead className="thead-dark cart-header">
                  <tr>
                    <td className="cart-title">&nbsp;#</td>
                    <td className="cart-title">Name</td>
                    <td className="cart-title">Price</td>
                    <td className="cart-title">Qty</td>
                    <td className="cart-title">Total</td>
                    <td className="cart-title">Action&nbsp;</td>
                  </tr>
                </thead>
                <tbody>
                  {cart
                    ? cart.map((cartProduct, key) => (
                        <tr key={key}>
                          <td className="table-head">{cartProduct.id}</td>
                          <td>{cartProduct.name}</td>
                          <td>{cartProduct.price}</td>
                          <td>{cartProduct.quantity}</td>
                          <td>{cartProduct.totalAmount}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => removeProduct(cartProduct)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    : "No Item in Cart"}
                </tbody>
              </table>

              <h6 className="total-amount text-white">
                Total Amount: ${totalAmount}
              </h6>

              <div className="print-container">
                <div className="btn-print-container">
                  {totalAmount !== 0 ? (
                    <div>
                      <button
                        className="btn-print rounded"
                        onClick={handlePrint}
                      >
                        Print Receipt
                      </button>
                    </div>
                  ) : (
                    <span>
                      <br />
                      Please add an item to the cart
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default POSPage;
