import { FunctionComponent } from "react";
import { CheckoutProps } from "../types/synth.types";
import Fiat from "./Fiat";
import Crypto from "./Crypto";
import Items from "./Items";
import ShippingInfo from "./ShippingInfo";
import { ACCEPTED_TOKENS, INFURA_GATEWAY } from "../../../../../lib/constants";
import Image from "next/legacy/image";

const Checkout: FunctionComponent<CheckoutProps> = ({
  openConnectModal,
  address,
  signInLoading,
  paymentType,
  setPaymentType,
  cartItems,
  cartItem,
  handleCheckoutCrypto,
  handleCheckoutFiat,
  fiatCheckoutLoading,
  cryptoCheckoutLoading,
  dispatch,
  setCheckoutCurrency,
  checkoutCurrency,
}): JSX.Element => {
  return (
    <div className="relative w-3/4 h-full flex flex-col items-center justify-start gap-4">
      <div className="relative w-1/2 justify-center flex flex-row font-mana text-white text-sm uppercase">
        <div
          className={`relative bg-azul flex items-center justify-center bg-azul rounded-sm border border-y-white border-r-white px-2 py-1 w-24 h-fit hover:opacity-70 cursor-pointer ${
            paymentType === "fiat" ? "bg-oscurazul" : "bg-azul"
          }`}
          onClick={() => setPaymentType("fiat")}
        >
          fiat
        </div>
        <div
          className={`relative rounded-sm px-2 py-1 bg-azul flex items-center justify-center border border-white w-24 h-fit hover:opacity-70 cursor-pointer ${
            paymentType === "crypto" ? "bg-oscurazul" : "bg-azul"
          }`}
          onClick={() => setPaymentType("crypto")}
        >
          crypto
        </div>
      </div>
      <Items
        cartItems={cartItems}
        cartItem={cartItem}
        paymentType={paymentType}
        dispatch={dispatch}
        checkoutCurrency={checkoutCurrency}
      />
      <div className="relative justify-start items-start w-3/4  h-fit flex flex-row font-mana text-ama text-base gap-3">
        <div className="relative w-fit h-fit">Total:</div>
        <div className="relative w-fit h-fit">
          {cartItems?.reduce(
            (accumulator, currentItem) => accumulator + currentItem.price,
            0
          )}
        </div>
      </div>
      <ShippingInfo />
      {paymentType === "crypto" && (
        <div className="relative w-3/4 justify-start items-center flex flex-row gap-1">
          {ACCEPTED_TOKENS?.map((item: string[], index: number) => {
            return (
              <div
                className={`relative w-fit h-fit rounded-full flex items-center cursor-pointer active:scale-95 ${
                  checkoutCurrency === item[1] ? "opacity-50" : "opacity-100"
                }`}
                key={index}
                onClick={() => setCheckoutCurrency(item[1])}
              >
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/${item[0]}`}
                  className="flex"
                  draggable={false}
                  width={30}
                  height={35}
                />
              </div>
            );
          })}
        </div>
      )}
      {paymentType === "crypto" ? (
        <Crypto
          address={address}
          openConnectModal={openConnectModal}
          signInLoading={signInLoading}
          handleCheckoutCrypto={handleCheckoutCrypto}
          cryptoCheckoutLoading={cryptoCheckoutLoading}
        />
      ) : (
        <Fiat
          handleCheckoutFiat={handleCheckoutFiat}
          fiatCheckoutLoading={fiatCheckoutLoading}
        />
      )}
    </div>
  );
};

export default Checkout;