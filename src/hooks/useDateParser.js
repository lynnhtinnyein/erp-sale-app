import moment from "moment";

const useDateParser = () => {
    class DateParser {
     
        getDate = (dateString) => {
            const dateObj = new Date(moment.utc(dateString, 'YYYY-MM-DD HH:mm:ss'));
    
            let day = dateObj.getDate();
            let month = dateObj.getMonth();
            let year = dateObj.getFullYear();
            
            day = day < 10 ? '0' + day : day;
            month = (month + 1);
    
            //add zero for better readability 
            month = month < 10 ? '0' + month : month;
            year = year.toString().substring(2);
    
            // Adding 1 to convert from 0-11 to 1-12
            return `${day}-${month}-${year}`;
        };
    
        getTime = (dateString) => {
            const dateObj = new Date(moment.utc(dateString, 'YYYY-MM-DD HH:mm:ss'));
    
            let hour = dateObj.getHours();
            let minute = dateObj.getMinutes();
    
            hour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
            minute = minute < 10 ? '0' + minute : minute;
            const period = hour < 12 ? 'AM' : 'PM';
    
            return `${hour}:${minute} ${period}`;
        } 
    
        getDateTime = (dateString) => {
            const date = this.getDate(dateString);
            const time = this.getTime(dateString);
            return `${date} ${time}`;
        }
    }

    return new DateParser();
}

export default useDateParser;