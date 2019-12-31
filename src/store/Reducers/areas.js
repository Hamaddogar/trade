import utlities from "../../utlities";

let initialData = {
  areas: [
    // {id:1,code:'area1', name:'Area 1', address:'some code in here too now again there is some', phone:'0231-2345678'},
    // {id:2,code:'area2', name:'Area 2', address:'some code in here too now again there is some', phone:'0231-2345678'},
    // {id:3,code:'area3', name:'Area 3', address:'some code in here too now again there is some', phone:'0231-2345678'},
    // {id:4,code:'area4', name:'Area 4', address:'some code in here too now again there is some', phone:'0231-2345678'},
    // {id:5,code:'area5', name:'Area  5', address:'some code in here too now again there is some', phone:'0231-2345678'},
  ]
};

export default (state = initialData, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "persist/REHYDRATE":
      action.payload && (newState.areas = action.payload.areaReducers.areas);
      break;

    case "AREA_UPDATED":
      let target = newState[action.model].find(item => {
        return item._id == action.payload._id;
      });
      newState[action.model][newState[action.model].indexOf(target)] =
        action.payload;
      break;

    case "AREAS_LOADED":
      newState.areas = action.payload;
      break;

    case "AREA_CREATED":
      newState.areas.push(action.payload);
      break;

    // case 'AREA_STATUS_UPDATED':
    //     newState.areas.forEach((areas) => {

    //         if (areas.__id == action.payload.__id) {
    //             areas.status = action.payload.status;
    //             return false;
    //         }

    //     });
    //     break;
  }

  newState.code = utlities.getID("AREA", "code", newState.areas);

  console.log(newState);

  return newState;
};
