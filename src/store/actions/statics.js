import server from "../../appConfig/httpHelper";
import { INDUSTRY_TYPE, SOURCE_TYPE, UOM, PACKAGING_TYPE } from "../constants";

const setIndustryType = (data) => ({
  type: INDUSTRY_TYPE,
  payload: data,
});

const setSourceType = (data) => ({
  type: SOURCE_TYPE,
  payload: data,
});

const setUom = (data) => ({
  type: UOM,
  payload: data,
});

const setPackagingType = (data) => ({
  type: PACKAGING_TYPE,
  payload: data,
});

export const getIndustryType = () => (dispatch) => {
  server
    .get("/industryType/get-all")
    .then((res) => {
      dispatch(setIndustryType(res.data.data));
    })
    .catch((err) => console.log(err));
};

export const getSourceType = () => (dispatch) => {
  server
    .get("/sourceType/get-all")
    .then((res) => {
      dispatch(setSourceType(res.data.data));
    })
    .catch((err) => console.log(err));
};

export const getUom = () => (dispatch) => {
  server
    .get("/uom/get-all")
    .then((res) => {
      dispatch(setUom(res.data.data));
    })
    .catch((err) => console.log(err));
};

export const getPackagingType = () => (dispatch) => {
  server
    .get("/packagingType/get-all")
    .then((res) => {
      dispatch(setPackagingType(res.data.data));
    })
    .catch((err) => console.log(err));
};
