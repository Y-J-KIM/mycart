import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./service/cartServices";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import CartContext from "./components/context/CartContext";
import UserContext from "./components/context/UserContext";

//이미 인증된 토큰이 있으면 요청헤더에 추가하고 없으면 제거한다.
setAuthToken(localStorage.getItem("token"));

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  //console.log(cart);
  //제품과, 개수를 입력하여 장바구니 업데이트
  const addToCart = (product, quantity) => {
    //같은 제품이 추가되면 수량만 추가하자!
    const updatedCart = [...cart]; //장바구니 복사
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    ); // 찾으면 그 제품의 인덱스 번호가 리턴됨 아니면 -1
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    //벡엔드 서버에도 장바구니 추가
    addToCartAPI(product._id, quantity)
      .then((res) => toast.success("상품 추가 성공!~"))
      .catch((err) => toast.error("상품 추가에 실패했습니다."));
  };
  //카트 정보를 가져옴
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("카트 가져오기에 실패했습니다.");
      });
  };
  //장바구니에서 상품 삭제 함수
  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);
    removeFromCartAPI(id).catch((err) => {
      toast.error("장바구니 상품 삭제 에러");
    });
  };
  //장바구니 상품 수량 증가 감소
  const updateCart = (type, id) => {
    const updatedCart = [...cart]; //장바구니 복사
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );
    //타입이 증가면 +1 , 감소면 -1 개수 업데이트
    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      increaseProductAPI(id).catch((err) => {
        toast.error("상품 증가 에러");
      });
    }
    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);
      decreaseProductAPI(id).catch((err) => {
        toast.error("상품 감소 에러");
      });
    }
  };
  useEffect(() => {
    if (user) getCart(); //처음 시작 및 유저가 바뀌면 가져옴
  }, [user]);
  //시작시 jwt 토큰을 가져옴
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        window.location.reload(); //재시작(리프레쉬)
      } else {
        setUser(jwtUser); //유효기간 내일때 유저정보 저장
      }
    } catch (err) {}
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
    >
      <UserContext.Provider value={user}>
        <div className="app">
          <Navbar user={user} cartCount={cart.length} />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing user={user} />
          </main>
        </div>
      </UserContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
