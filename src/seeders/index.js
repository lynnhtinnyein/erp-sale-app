import inventory from './inventory';
import leads from './leads';
import opportunities from './opportunities';
import saleOrders from './saleOrders';

const seeders = [
    {
        tableName: 'inventory',
        data: inventory,
    },
    {
        tableName: 'leads',
        data: leads,
    },
    {
        tableName: 'opportunities',
        data: opportunities,
    },
    // {
    //     tableName: 'sale_orders',
    //     data: saleOrders,
    // }
];

export default seeders;