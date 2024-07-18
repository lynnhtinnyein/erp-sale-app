import moment from "moment";

const opportunities = [
    {
        id: 1,
        name: 'Customer 7', 
        phone: '4342343434',
        email: 'customer7@gmail.com',
        companyName: 'Demo Company 7',
        description: 'some description',
        date: moment(),
        productId: 5,
        type: 'appointment' 
    },
    {
        id: 2,
        name: 'Customer 8', 
        phone: '3438284383',
        email: 'customer8@gmail.com',
        companyName: 'Demo Company 8',
        description: '',
        date: moment(),
        productId: 6,
        type: 'price_enquiry' 
    },
]

export default opportunities;