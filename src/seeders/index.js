import financialRecords from './financialRecords';
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
    {
        tableName: 'sale_orders',
        data: saleOrders,
    },
    {
        tableName: 'financial_records',
        data: financialRecords,
    }
];

export default seeders;