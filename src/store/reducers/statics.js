import {
  INDUSTRY_TYPE,
  PACKAGING_TYPE,
  SOURCE_TYPE,
  UOM,
} from "../constants/index";

const initialValues = {
  industryType: [],
  sourceType: [],
  uom: [],
  packagingType: [],
};
const staticsReducer = (state = initialValues, action) => {
  switch (action.type) {
    case INDUSTRY_TYPE: {
      return {
        ...state,
        industryType: action.payload,
      };
    }
    case SOURCE_TYPE: {
      return {
        ...state,
        sourceType: action.payload,
      };
    }
    case UOM: {
      return {
        ...state,
        uom: action.payload,
      };
    }
    case PACKAGING_TYPE: {
      return {
        ...state,
        packagingType: action.payload,
      };
    }
    default:
      return state;
  }
};

export default staticsReducer;
