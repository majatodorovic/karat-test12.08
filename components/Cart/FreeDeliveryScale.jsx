import { currencyFormat } from "@/helpers/functions";

/**
 * Calculates data for a free delivery scale based on cart totals and delivery options.
 *
 * @param {Object} [params={}] - The parameters for the calculation.
 * @param {Object} [params.totals] - The cart totals.
 * @param {number} [params.totals.subtotal] - The subtotal of the cart.
 * @param {number} [params.totals.promo_code] - The cart total after applying promo codes.
 * @param {Object} [params.options] - The delivery options.
 * @param {Object} [params.options.delivery] - The delivery details.
 * @param {Object} [params.options.delivery.free_delivery] - The free delivery configuration.
 * @param {number} [params.options.delivery.free_delivery.amount] - The minimum amount for free delivery.
 * @param {number} [params.options.delivery.free_delivery.percent] - The percentage of progress towards free delivery.
 * @param {number} [params.options.delivery.free_delivery.amount_to_free_delivery] - The amount remaining for free delivery.
 * @returns {Object|undefined} The calculated free delivery scale data or undefined if required parameters are missing.
 * @returns {boolean} [returns.show] - Whether to show the free delivery scale.
 * @returns {number} [returns.percent] - The percentage of progress towards free delivery.
 * @returns {string} [returns.text] - The message to display for free delivery.
 * @returns {boolean} [returns.freeDelivery] - Whether free delivery has been achieved.
 * @returns {string} [returns.remainingCost] - The formatted remaining cost to qualify for free delivery.
 */
const calcFreeDeliveryScaleData = ({ totals, options } = {}) => {
  if (totals && options) {
    const {
      delivery: {
        free_delivery: { amount, percent, amount_to_free_delivery },
      },
    } = options;
    const cartCost = totals?.subtotal ?? totals?.promo_code;
    const data = {
      show: process.env.SHOW_FREE_DELIVERY_SCALE === "true" ? true : false,
      percent:
        percent && amount_to_free_delivery
          ? percent
          : Math.min(Math.round((cartCost / amount) * 100), 100),
      text: "Ostvarili ste besplatnu dostavu",
      freeDelivery: true,
      remainingCost: currencyFormat(
        amount_to_free_delivery ?? amount - cartCost,
      ),
    };

    if (data.percent < 100) {
      data.text = "Do besplatne dostave nedostaje ti još";
      data.freeDelivery = false;
    }
    return data;
  }
  return undefined;
};
export default function FreeDeliveryScale({ summary }) {
  const data = calcFreeDeliveryScaleData(summary);

  return (
    <>
      {data?.show && (
        <div className={`py-5`}>
          <div className={`mt-2 w-full`}>
            <div className="mt-3 h-1.5 w-full bg-[#989898]">
              <div
                className="relative h-full bg-[#3dab25] transition-all duration-500"
                style={{
                  width: `${data?.percent}%`,
                }}
              >
                <div className="absolute -top-[8px] right-0 flex h-6 w-6 rounded-full bg-[#3dab25]"></div>
              </div>
            </div>
            <h1
              className={`text-black] mt-4 text-base font-normal ${
                data?.freeDelivery ? "hidden" : ""
              }`}
            >
              {data?.text}{" "}
              <span className="text-primary">{data?.remainingCost}</span>
            </h1>
          </div>
          {data?.freeDelivery && (
            <h1 className="mt-3 text-base font-bold text-[#3dab25]">
              {data?.text}
            </h1>
          )}
        </div>
      )}
    </>
  );
}
