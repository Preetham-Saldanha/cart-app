import { NextApiRequest, NextApiResponse } from "next"
import prismadb from '../../lib/prismadb'
import { buffer } from "micro";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;


// model Order {
//     id                String      @id @default(auto()) @map("_id") @db.ObjectId
//     email             String
//     amount            Int
//     itemsDetail       String
//     status            String
//     createdAt         DateTime    @default(now())
//     checkout_event_id String
//     OrderItem         OrderItem[]
//   }

//   model OrderItem {
//     id        String  @id @default(auto()) @map("_id") @db.ObjectId
//     order     Order   @relation(fields: [orderId], references: [id])
//     orderId   String  @db.ObjectId
//     product   Product @relation(fields: [productId], references: [id])
//     productId String  @db.ObjectId
//     quantity  Int
//   }


const fullfillorder = async (session: any) => {

    const itemsDetail = JSON.parse(session.metadata.items)
    const oderItemsObj: any = []

    for (let i = 0; i < itemsDetail.length; i++) {
        const obj = { productId: "", quantity: 1 }
        obj.productId = Object.keys(itemsDetail[i])[0];
        obj.quantity = itemsDetail[i][Object.keys(itemsDetail[i])[0]]

        oderItemsObj.push(obj)
    }

    console.log(oderItemsObj, "transformed", Math.floor(Number.parseInt(session.amount_total)/100), (session.amount_total)/100)

    return prismadb.order.create({
        data: {
            amount: Math.floor(session.amount_total/100),
            email: session.metadata.email,
            // itemsDetail: session.metadata.items,
            status: "successfull",
            checkout_event_id: session.id,
            orderItems: {


                createMany: {
                    data: oderItemsObj
                }

            },
        },
        include: {
            orderItems: true,
        },



        //payment_method_details: 
        // receipt_url:
        //     https://pay.stripe.com/
        //     receipts/payment/CAcaFwoVYWNjdF8xTXFIMjFTQTVJYWVBY1NZKIbfpKEGMga6E_JQz_46LBYXAxTA-o6t0JLttXu_VwesUB4KIH1XDnY_uzPcE6usAFWiziP4tvSKYOJZ
    }








    ).then((res) => {
        console.log(res, "result")
        console.log(`Success: order ${session.id} has been added to the database`)
    }).catch(err => console.log("error is", err))
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "POST") {
        const buff = await buffer(req)
        const sig = req.headers['stripe-signature'];

        let event;

        // Verify webhook signature and extract the event.
        // See https://stripe.com/docs/webhooks/signatures for more information.
        try {
            event = stripe.webhooks.constructEvent(buff, sig, endpointSecret);
        } catch (err: any) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }




        if (event.type === 'checkout.session.completed') {
            // if(event.type ==='payment_intent.succeeded'){
            const session = event.data.object;
            console.log("goood luck", session)


            return fullfillorder(session).then(() => res.status(200)).catch(err => res.status(400).send(`Webhook error: ${err.message}`));
        }
        // return res.status(200).send("")

    }


}


export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}


// mode: 'payment',
// payment_intent: 'pi_3MsLOeSA5IaeAcSY0eJJUBsn',
// payment_link: null,
// payment_method_collection: 'always',
// payment_method_options: {},
// payment_method_types: [ 'card' ],
// payment_status: 'paid',
// phone_number_collection: { enabled: false },
// recovered_from: null,
// setup_intent: null,
// shipping_address_collection: null,
// shipping_cost: null,
// shipping_details: null,
// shipping_options: [],
// status: 'complete',
// submit_type: null,
// subscription: null,
// success_url: 'https://localhost:3000/success',
// total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
// url: null

// charge.succeeded event type {
//     id: 'ch_3MsLOeSA5IaeAcSY0QppNkKm',
//     object: 'charge',
//     amount: 3047520,
//     amount_captured: 3047520,
//     amount_refunded: 0,
//     application: null,
//     application_fee: null,
//     application_fee_amount: null,
//     balance_transaction: 'txn_3MsLOeSA5IaeAcSY03Ewd6bq',
//     billing_details: {
//       address: {
//         city: null,
//         country: 'IN',
//         line1: null,
//         line2: null,
//         postal_code: null,
//         state: null
//       },
//       email: 'preethamsaldanha26@gmail.com',
//       name: 'Preethm',
//       phone: null
//     },
//     calculated_statement_descriptor: 'Stripe',
//     captured: true,
//     created: 1680420740,
//     currency: 'inr',
//     customer: null,
//     description: null,
//     destination: null,
//     dispute: null,
//     disputed: false,
//     failure_balance_transaction: null,
//     failure_code: null,
//     failure_message: null,
//     fraud_details: {},
//     invoice: null,
//     livemode: false,
//     metadata: {},
//     on_behalf_of: null,
//     order: null,
//     outcome: {
//       network_status: 'approved_by_network',
//       reason: null,
//       risk_level: 'normal',
//       risk_score: 27,
//       seller_message: 'Payment complete.',
//       type: 'authorized'
//     },
//     paid: true,
//     payment_intent: 'pi_3MsLOeSA5IaeAcSY0eJJUBsn',
//     payment_method: 'pm_1MsLOdSA5IaeAcSYscRT1qke',
//     payment_method_details: {
//       card: {
//         brand: 'visa',
//         checks: [Object],
//         country: 'US',
//         exp_month: 9,
//         exp_year: 2024,
//         fingerprint: 'Qnmzmg0qCsXLCjKJ',
//         funding: 'credit',
//         installments: null,
//         last4: '4242',
//         mandate: null,
//         network: 'visa',
//         network_token: null,
//         three_d_secure: [Object],
//         wallet: null
//       },
//       type: 'card'
//     },
//     receipt_email: null,
//     receipt_number: null,
//     receipt_url: 'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTXFIMjFTQTVJYWVBY1NZKIbfpKEGMga6E_JQz_46LBYXAxTA-o6t0JLttXu_VwesUB4KIH1XDnY_uzPcE6usAFWiziP4tvSKYOJZ',
//     refunded: false,
//     review: null,
//     shipping: null,
//     source: null,
//     source_transfer: null,
//     statement_descriptor: null,
//     statement_descriptor_suffix: null,
//     status: 'succeeded',
//     transfer_data: null,
//     transfer_group: null
//   }
//   checkout.session.completed event type {
//     id: 'cs_test_b1KyLes15beUMp2QQ08pe45tVvFDj9bl15Q3OopXlW1LXMxJPTAhpJgnKW',
//     object: 'checkout.session',
//     after_expiration: null,
//     allow_promotion_codes: null,
//     amount_subtotal: 3047520,
//     amount_total: 3047520,
//     automatic_tax: { enabled: false, status: null },
//     billing_address_collection: null,
//     cancel_url: 'https://localhost:3000/cart',
//     client_reference_id: null,
//     consent: null,
//     consent_collection: null,
//     created: 1680420691,
//     currency: 'inr',
//     currency_conversion: null,
//     custom_fields: [],
//     custom_text: { shipping_address: null, submit: null },
//     customer: null,
//     customer_creation: 'if_required',
//     customer_details: {
//       address: {
//         city: null,
//         country: 'IN',
//         line1: null,
//         line2: null,
//         postal_code: null,
//         state: null
//       },
//       email: 'preethamsaldanha26@gmail.com',
//       name: 'Preethm',
//       phone: null,
//       tax_exempt: 'none',
//       tax_ids: []
//     }


