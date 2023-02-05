import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);

    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          //free shipping
          { shipping_rate: "shr_1MXiAyHmLLMBaIJaGPVFeOZa" },
          //fast shipping
          { shipping_rate: "shr_1MXiHiHmLLMBaIJaApWIBRcN" },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/wu870gn4/production/"
            )
            .replace("-webp", ".webp");
          //can replace -JPEG .JPEG -PNG .PNG

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              //cent * 100 = 1USD
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
