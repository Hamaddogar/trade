// import history from '../../historyProvider';
import messages from '../../message';
import { toast  } from 'react-toastify';


export default {
    /// Needs Customer ID and desired state
    toggleAreaState(data) {        

        return (dispatch) => {

            fetch('/api/areas/toggleState', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(resp => {
                    return resp.json();
                }).then((area) => {

                    if(area._id){
                        dispatch({
                            type:'AREA_UPDATED',
                            payload:area
                        });
                        toast.success(messages.area.updated);
                    }else{
                        toast.error(messages.area.error.cannotUpdate);
                    }

                 });

        }

    },
    createArea(data) {

        return (dispatch) => {


            fetch('/api/areas/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(resp => {
                    return resp.json();
                }).then((area) => {

                    if(area._id){
                        dispatch({
                            type: data._id ? 'AREA_UPDATED' : 'AREA_CREATED',
                            payload:area,
                            model:'areas'
                        });
                        toast.success(messages.area[data._id ? 'updated' : 'created']);
                    }else{
                        toast.error(messages.area.error.cannotCreate);
                    }

                 });

        }

    }

}