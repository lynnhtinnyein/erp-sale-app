import moment from "moment";

const leads = [
    {
        id: 1,
        name: 'Customer 1', 
        phone: '0123456789',
        email: 'customer1@gmail.com',
        companyName: 'Demo Company 1',
        description: 'some description',
        date: moment(),
        productId: 1,
        type: 'appointment' 
    },
    {
        id: 2,
        name: 'Customer 2', 
        phone: '987654322',
        email: 'customer2@gmail.com',
        companyName: 'Demo Company 2',
        description: '',
        date: moment(),
        productId: 3,
        type: 'service_inquiry' 
    },
    {
        id: 3,
        name: 'Customer 3', 
        phone: '433533223',
        email: 'customer3@gmail.com',
        companyName: 'Demo Company 3',
        description: 'abc',
        date: moment(),
        productId: 6,
        type: 'price_inquiry' 
    },
    {
        id: 4,
        name: 'Customer 4', 
        phone: '433533223',
        email: 'customer4@gmail.com',
        companyName: 'Demo Company 4',
        description: '',
        date: moment(),
        productId: 4,
        type: 'appointment' 
    }
]

export default leads;