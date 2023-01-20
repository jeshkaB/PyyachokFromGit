import {axiosService} from "./axios.service";


//TODO - для експерименту
const getAll = (entity) => {axiosService.get(`/${entity}s`)}
function getById (entity, data, id) {axiosService.get(`/${entity}s`, data)}

export {getAll}

// export {restaurantService}
