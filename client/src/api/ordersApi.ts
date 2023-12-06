import { CreditCardDetails } from "../types/creditCard";
import { OrderInterface } from "../types/order";
import handleApiRes from "./apiResHandler";
const api = import.meta.env.VITE_API_URI


async function checkDebitCard(debitCard: CreditCardDetails): Promise<CreditCardDetails> {
    //change end point
    const response = await fetch(`${api}/orders/checkout/check`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(debitCard),
    });

    return await handleApiRes(response);
}

async function sendOrder(order: OrderInterface): Promise<OrderInterface> {
    console.log('order in api',order);
    const response = await fetch(`${api}/orders/checkout/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({order}),
    });
    console.log("response: ", response);
    return await handleApiRes(response);
}

export {
    checkDebitCard,
    sendOrder
}