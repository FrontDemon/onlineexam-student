export const getNumberPrefix = data => data > 9 ? data : "0" + data;

export const getCurrentDate = function(){
    const date = new Date();
    return `${getNumberPrefix(date.getFullYear())}-${getNumberPrefix(date.getMonth()+1)}-${getNumberPrefix(date.getDate())}`;
}
 