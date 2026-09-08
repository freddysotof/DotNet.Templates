// Fetch.js

const RequestMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

//Flag Enumerations in JavaScript
//Flag enums: Values must increment by powers of 2
const ParameterType = {
    RouteValueOnly:1,
    QueryString: 2,
    JsonBody:4
}

//const objectToQueryString = (obj) => Object.keys(obj).map(key => key + '=' + `${obj[key]}`).join('&');
const objectToQueryString = (obj) => Object.keys(obj).map(key => key + '=' + `${obj[key] == "" ? '' : `${obj[key]}`}`).join('&');
const objectToRouteValue = (obj) => typeof (obj) == 'object' ? Object.keys(obj).map(key => obj[key]).join('/') : obj;

const generateErrorResponse = (message) => {
    status: 'error',
    message
};

const request = async (url, params, paramType, method, hasContentType=true ) => {
    const options = {
        method,
        headers: {
       /*     'Accept':'application/json',*/
            'Content-Type': 'application/json'
        },
        //redirect: 'follow'
    };
    if (!hasContentType)
        delete options['headers'];
    if (params)
        if (method === RequestMethod.GET && paramType == ParameterType.RouteValueOnly)
            url += `/${objectToRouteValue(params)}`;
        else if (method === RequestMethod.GET && paramType == ParameterType.QueryString)
            url += $`?${objectToQueryString(params)}`;
        else {
            if (paramType & ParameterType.RouteValueOnly)
                url += `/${objectToRouteValue(params)}`;
            if (paramType & ParameterType.QueryString)
                url += $`?${objectToQueryString(params)}`;
            if (paramType & ParameterType.JsonBody && hasContentType)
                options.body = JSON.stringify(params);
            if (paramType & ParameterType.JsonBody && !hasContentType)
                options.body = params;
        }
    try {
        const response = await fetch(url, options);
 
        //console.log(response);
    //     .then(res => {
    //         return res.json();
    //     })
    //.then(() => {
    //    return formatResponse(result);
    //})
    //.catch((response) => {
    //    const { status: statusCode, statusText: statusError, ok: isSuccessStatusCode, ...rest } = response

    //    throw {
    //        statusCode, errors: [{ statusError }], isSuccessStatusCode
    //    };
    //})
        if (response.ok) {
            let result;
            let responseBody = await response.text();
            if (isJson(responseBody)) {
                result = JSON.parse(responseBody);
                return formatResponse(result);
            } else
                return responseBody;
          
        }
        else {
            const { status: statusCode, statusText: statusError, ok: isSuccessStatusCode } = response;
            let responseBody = await response.text();
            let data;
            if (isJson(responseBody)) {
                data = JSON.parse(responseBody);
            } else
                data = responseBody;
            throw {
                statusCode, errors: formatErrors(data), isSuccessStatusCode, data 
            };
        }
    } catch (e) {
        throw e;
    }
        
 
     
    //const result = await response.json();

    //const { count, data, errors, messages, isSuccessStatusCode } = result;
    //if (isSuccessStatusCode) {
    //    if (count == 1) {
    //        let firstData = [...data].shift();    
    //        return { firstData, messages };
    //    }
    //    else
    //        return { data, messages };
    //}
    //else
    //    return errors;
}




const get = (url, params, paramType = ParameterType.RouteValueOnly, hasContentType) => request(url, params, paramType, RequestMethod.GET, hasContentType);

const create = (url, params, hasContentType, paramType = ParameterType.JsonBody) => request(url, params, paramType, RequestMethod.POST, hasContentType);

const update = (url, params, paramType = ParameterType.JsonBody, hasContentType) => request(url, params, paramType, RequestMethod.PUT, hasContentType);

const remove = (url, params, paramType = ParameterType.RouteValueOnly, hasContentType) => request(url, params, paramType, RequestMethod.DELETE, hasContentType);


//export default {
//    get,
//    create,
//    update,
//    remove,
//    RequestMethod,
//    ParameterType
//};