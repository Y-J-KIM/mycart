import apiClient from "../utils/api-client";

//장바구니를 주문하기
export function checkoutAPI() {
  return apiClient.post("/order/checkout");
}
