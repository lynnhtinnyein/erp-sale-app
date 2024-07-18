import inventory from './inventory';
import leads from './leads';
import opportunities from './opportunities';

const tables = [
    {
        name: 'inventory',
        data: inventory,
    },
    {
        name: 'leads',
        data: leads,
    },
    {
        name: 'opportunities',
        data: opportunities,
    }
];

export default tables;