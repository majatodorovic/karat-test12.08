import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetch as FETCH } from "@/api/api";
import { Form, createOptionsArray } from "@/_components/form";
import Image from "next/image";
import { useState } from "react";

const CheckoutOptions = ({
  formData,
  setFormData,
  payment_options,
  delivery_options,
  errors,
  setErrors,
}) => {
  const queryClient = useQueryClient();
  const { data: delivery_form } = useQuery({
    queryKey: [
      "delivery-option-form",
      {
        delivery_method: formData?.delivery_method,
      },
    ],
    queryFn: async () => {
      return await FETCH(
        `checkout/delivery-option-form/${formData?.delivery_method}`,
        {
          order_data: {},
        },
      ).then((res) => res?.payload);
    },
  });

  const [openDeliveryOption, setOpenDeliveryOption] = useState(null);
  const [openPaymentOption, setOpenPaymentOption] = useState(null);

  const onChange = ({ value, prop_name, selected }) => {
    let data = {};
    if (value) {
      let method_id = formData?.delivery_method;
      let method_name = (delivery_options ?? [])?.find(
        (o) => o?.id === formData?.delivery_method,
      )?.name;

      data = {
        delivery_method_id: method_id,
        delivery_method_name: method_name,
        prop_name,
        selected,
      };

      const arr = createOptionsArray(data);
      setErrors(errors?.filter((error) => error !== "delivery_method_options"));
      setFormData({
        ...formData,
        delivery_method_options: arr,
      });
      queryClient.fetchQuery({
        queryKey: ["summary", formData],
        queryFn: async () => {
          return await FETCH(`checkout/summary`, {
            ...formData,
            delivery_method_options: arr,
          }).then((res) => res?.payload);
        },
      });
    }
  };

  return (
    <>
      <div className={`col-span-2 lg:col-span-1`}>
        <div className={`flex flex-col gap-10`}>
          <div>
            <div className={`flex flex-col gap-3`}>
              <h2 className="text-2xl font-normal">Način dostave</h2>
              <div className="h-[2px] w-full bg-primary" />
            </div>
            <div className={`mt-8 flex flex-col gap-6`}>
              {(delivery_options ?? [])?.map(({ id, name }) => {
                const isOpen = openDeliveryOption === id;
                return (
                  <div className={`flex flex-col gap-2`} key={id}>
                    <div
                      className={`flex flex-col rounded-[12px] bg-lightGray p-7`}
                      key={id}
                    >
                      <div className="relative flex items-center gap-3">
                        <input
                          type={`radio`}
                          className="peer hidden"
                          name={`delivery_method`}
                          id={`delivery_method_${id}`}
                          value={id}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              delivery_method: e.target.value,
                              delivery_method_options: [],
                            });
                            setErrors(
                              errors?.filter(
                                (error) => error !== "delivery_method",
                              ),
                            );
                            // refreshSummary();
                            queryClient.fetchQuery({
                              queryKey: ["summary"],
                              queryFn: async () => {
                                return await FETCH(`checkout/summary`, {
                                  ...formData,
                                  delivery_method: e.target.value,
                                  delivery_method_options: [],
                                }).then((res) => res?.payload);
                              },
                            });
                          }}
                        />
                        <label
                          htmlFor={`delivery_method_${id}`}
                          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border border-black bg-white text-white peer-checked:text-primary"
                        >
                          <i className="fa fa-circle hidden text-sm"></i>
                        </label>
                        <label
                          htmlFor={`delivery_method_${id}`}
                          className={`cursor-pointer text-lg font-light`}
                        >
                          {name}
                        </label>
                        <Image
                          src="/icons/chevron-right.png"
                          alt="chevron"
                          width={22}
                          height={22}
                          className={`absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-200 ${isOpen ? "rotate-90" : "-rotate-90"} cursor-pointer invert`}
                          onClick={() =>
                            setOpenDeliveryOption(isOpen ? null : id)
                          }
                        />
                      </div>
                      {delivery_options.find((o) => o.id === id)?.type ===
                        "delivery_to_address" &&
                        isOpen && (
                          <div className="mt-4 w-full border-t pt-4 text-sm font-light">
                            <p>
                              Dostava pošiljke na kućnu adresu je besplatna.
                              Ukoliko je aparat teži od 20kg, dostavu će vršiti
                              dva kurira do Vaseg stana/kuće.
                            </p>
                          </div>
                        )}
                      {delivery_options.find((o) => o.id === id)?.type ===
                        "in_store_pickup" &&
                        isOpen && (
                          <div className="mt-4 w-full border-t pt-4 text-sm font-light">
                            <p>
                              Svaka porudžbina se prvo evidentira i potvrđuje.
                              Nakon potvrde će Vas naši operateri zvati radi
                              dogovora oko preuzimanja u našim maloprodajama.
                            </p>
                          </div>
                        )}
                    </div>
                    {formData?.delivery_method === id &&
                      delivery_form?.status &&
                      delivery_form?.fields?.length > 0 && (
                        <Form
                          errors={errors}
                          fields={delivery_form?.fields}
                          onChange={onChange}
                          className="w-full"
                        />
                      )}
                  </div>
                );
              })}
            </div>
            {errors?.includes("delivery_method") && (
              <div className={`mt-1 text-xs text-red-500`}>
                Ovo polje je obavezno.
              </div>
            )}
          </div>
          <div>
            <div className={`flex flex-col gap-2`}>
              <h2 className="text-2xl font-normal">Način plaćanja</h2>
              <div className="h-[2px] w-full bg-primary" />
            </div>
            <div className={`mt-8 flex flex-col gap-6`}>
              {(payment_options ?? [])?.map(({ id, name, type }) => {
                const isOpen = openPaymentOption === id;
                return (
                  <div
                    className={`flex flex-col rounded-[12px] bg-lightGray p-7`}
                    key={id}
                  >
                    <div className="relative flex items-center gap-3">
                      <input
                        type={`radio`}
                        className="peer hidden"
                        name={`payment_method`}
                        id={`payment_method_${id}`}
                        value={id}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            payment_method: e.target.value,
                          });
                          setErrors(
                            errors?.filter(
                              (error) => error !== "payment_method",
                            ),
                          );
                        }}
                      />
                      <label
                        htmlFor={`payment_method_${id}`}
                        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border border-black bg-white text-white peer-checked:text-primary"
                      >
                        <i className="fa fa-circle hidden text-sm"></i>
                      </label>
                      <label
                        htmlFor={`payment_method_${id}`}
                        className={`cursor-pointer text-lg font-light`}
                      >
                        {name}
                      </label>
                      <Image
                        src="/icons/chevron-right.png"
                        alt="chevron"
                        width={22}
                        height={22}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-200 ${isOpen ? "rotate-90" : "-rotate-90"} cursor-pointer invert`}
                        onClick={() => setOpenPaymentOption(isOpen ? null : id)}
                      />
                    </div>
                    {payment_options.find((o) => o.id === id)?.type ===
                      "pay_on_delivery" &&
                      isOpen && (
                        <div className="mt-4 w-full border-t pt-4 text-sm font-light">
                          <p>
                            Plaćanje pouzećem kuriru prilikom preuzimanja
                            pošiljke.
                            <br />
                            Plaćanje se vrši isključivo gotovinom.
                          </p>
                        </div>
                      )}
                    {payment_options.find((o) => o.id === id)?.type ===
                      "credit_card" &&
                      isOpen && (
                        <div className="mt-4 w-full border-t pt-4 text-sm font-light">
                          <p>
                            Sva plaćanja će biti obavljena u dinarima (RSD).
                            Unos svih elemenata kartice će se obavljati na sajtu
                            banke i podaci neće ostajati na našem sajtu. Ukoliko
                            se plaća platnim karticama inostranih Banaka
                            izdavalaca, dinarski iznos transakcije će biti
                            konvertovan u settlement valutu Banke (EUR) prema
                            kursu Narodne Banke Srbije. Pri zaduživanju Vaše
                            platne kartice, već konvertovan iznos će se
                            konvertovati u Vašu lokalnu valutu, prema kursu koji
                            primenjuju operatori platnih kartica. Navedena cena
                            koja je različita od RSD, a navedena na sajtu je
                            informativnog karaktera i zbog navedenih konverzija
                            moguće je da dođe do odstupanja od iste.
                          </p>
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
            {errors?.includes("payment_method") && (
              <div className={`mt-1 text-xs text-red-500`}>
                Ovo polje je obavezno.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutOptions;
