import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    BusinessId: '',
    BusinessName: '',
    BImage: '',
    Industry: '',
    City: '',
    Address: '',
    LocationType: '',
    ZIPCode: null,
    SIC: null,
    SIC2Category: '',
    SIC4Category: '',
    SIC8Category: '',
    NAICS: null,
    UserId: '',
    ContactName: '',
    Phone: null,
    Web: '',
    Coordinates: '',
    MarketVariable: '',
    AnnualRevenue: '',
    YearFounded: null
};

const businessInfoSlice = createSlice({
    name: "businessInfo",
    initialState,
    reducers: {
        initiateBusinessInfo(state, action) {
            console.log('actionpayload===>', action.payload)

            // const newState = { ...state, ...action.payload }
            // state = newState
            action.payload._id && (state.BusinessId = action.payload._id)
            action.payload.BusinessName && (state.BusinessName = action.payload.BusinessName)
            action.payload.BImage && (state.BImage = action.payload.BImage)
            action.payload.Industry && (state.Industry = action.payload.Industry)
            action.payload.City && (state.City = action.payload.City)
            action.payload.Address && (state.Address = action.payload.Address)
            action.payload.LocationType && (state.LocationType = action.payload.LocationType)
            action.payload.ZIPCode && (state.ZIPCode = action.payload.ZIPCode)
            action.payload.SIC && (state.SIC = action.payload.SIC)
            action.payload.SIC2Category && (state.SIC2Category = action.payload.SIC2Category)
            action.payload.SIC4Category && (state.SIC4Category = action.payload.SIC4Category)
            action.payload.SIC8Category && (state.SIC8Category = action.payload.SIC8Category)
            action.payload.NAICS && (state.NAICS = action.payload.NAICS)
            action.payload.UserId && (state.UserId = action.payload.UserId)
            action.payload.ContactName && (state.ContactName = action.payload.ContactName)
            action.payload.Phone && (state.Phone = action.payload.Phone)
            action.payload.Web && (state.Web = action.payload.Web)
            action.payload.Coordinates && (state.Coordinates = action.payload.Coordinates)
            action.payload.MarketVariable && (state.MarketVariable = action.payload.MarketVariable)
            action.payload.AnnualRevenue && (state.AnnualRevenue = action.payload.AnnualRevenue)
            action.payload.YearFounded && (state.YearFounded = action.payload.YearFounded)
        },

        removeBusinessInfo(state) {
            state.BusinessId = ''
            state.BusinessName = ''
            state.BImage = ''
            state.Industry = ''
            state.City = ''
            state.Address = ''
            state.LocationType = ''
            state.ZIPCode = null
            state.SIC = null
            state.SIC2Category = ''
            state.SIC4Category = ''
            state.SIC8Category = ''
            state.NAICS = null
            state.UserId = ''
            state.ContactName = ''
            state.Phone = null
            state.Web = ''
            state.Coordinates = ''
            state.MarketVariable = ''
            state.AnnualRevenue = ''
            state.YearFounded = null
        }
    },
});

export const BusinessInfoSlice = businessInfoSlice;
