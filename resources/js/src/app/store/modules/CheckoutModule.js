import ApiService from "services/ApiService";

const state =
    {
        shipping: {
            shippingCountryId: null,
            shippingProfileId: null,
            shippingProfileList: []
        },
        payment: {
            methodOfPaymentId: null,
            methodOfPaymentList: []
        },
        validation: {
            gtc: {
                showError: false,
                validate: null
            },
            invoiceAddress: {
                showError: false,
                validate: null
            },
            paymentProvider: {
                showError: false,
                validate: null
            },
            shippingProfile: {
                showError: false,
                validate: null
            }
        }
    };

const mutations =
    {
        setShippingCountryId(state, shippingCountryId)
        {
            if (shippingCountryId)
            {
                state.shipping.shippingCountryId = shippingCountryId;
            }
        },

        setShippingProfile(state, shippingProfile)
        {
            if (shippingProfile)
            {
                state.shipping.shippingProfileId = shippingProfile.parcelServicePresetId;
            }
        },

        setShippingProfileList(state, shippingProfileList)
        {
            if (Array.isArray(shippingProfileList))
            {
                state.shipping.shippingProfileList = shippingProfileList;
            }
        },

        setMethodOfPayment(state, methodOfPayment)
        {
            if (methodOfPayment)
            {
                state.payment.methodOfPaymentId = methodOfPayment.id;
            }
        },

        setMethodOfPaymentList(state, methodOfPaymentList)
        {
            if (Array.isArray(methodOfPaymentList))
            {
                state.payment.methodOfPaymentList = methodOfPaymentList;
            }
        },

        setPaymentProviderValidator(state, paymentProviderValidator)
        {
            state.validation.paymentProvider.validate = paymentProviderValidator;
        },

        setShippingProfileValidator(state, shippingProfileValidator)
        {
            state.validation.shippingProfile.validate = shippingProfileValidator;
        },

        setGtcValidator(state, gtcValidator)
        {
            state.validation.gtc.validate = gtcValidator;
        },

        setInvoiceAddressValidator(state, invoiceAddressValidator)
        {
            state.validation.invoiceAddress.validate = invoiceAddressValidator;
        }
    };

const actions =
    {
        setCheckout({commit}, checkout)
        {
            commit("setShippingCountryId", checkout.shippingCountryId);
            commit("setShippingProfile", checkout.shippingProfileList.find(profile => profile.parcelServicePresetId === checkout.shippingProfileId));
            commit("setShippingProfileList", checkout.shippingProfileList);
            commit("setMethodOfPaymentList", checkout.paymentDataList);
            commit("setMethodOfPayment", checkout.methodOfPaymentId);
        },

        selectMethodOfPayment({commit, dispatch}, methodOfPayment)
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.post("/rest/io/checkout/paymentId/", {paymentId: methodOfPayment.id})
                    .done(response =>
                    {
                        commit("setMethodOfPayment", methodOfPayment);
                        resolve(response);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
                resolve();
            });
        },

        selectShippingProfile({commit, dispatch}, shippingProfile)
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.post("/rest/io/checkout/shippingId/", {shippingId: shippingProfile.id})
                    .done(response =>
                    {
                        commit("setShippingProfile", shippingProfile);
                        resolve(response);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
                resolve();
            });
        }
    };

const getters =
    {
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
