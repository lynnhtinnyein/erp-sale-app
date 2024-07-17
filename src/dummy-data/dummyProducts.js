import {v4 as uuid} from 'uuid';

const dummyProducts = [
    {
        id: uuid(),
        name: "POS System Pro",
        type: "software",
        platforms: ["mobile", "web", "desktop"],
        image: "https://c8.alamy.com/comp/2PR9785/businessman-hand-world-virtual-screen-erp-enterprise-resource-planning-digital-technology-connection-icon-concept-2PR9785.jpg"
    },
    {
        id: uuid(),
        name: "ERP Solution Suite",
        type: "software",
        platforms: ["web", "desktop"],
        image: "https://c8.alamy.com/comp/2PR9785/businessman-hand-world-virtual-screen-erp-enterprise-resource-planning-digital-technology-connection-icon-concept-2PR9785.jpg"
    },
    {
        id: uuid(),
        name: "Accounting Pro",
        type: "software",
        platforms: ["mobile", "web"],
        image: "https://c8.alamy.com/comp/2PR9785/businessman-hand-world-virtual-screen-erp-enterprise-resource-planning-digital-technology-connection-icon-concept-2PR9785.jpg"
    },
    {
        id: uuid(),
        name: "HR Management Suite",
        type: "software",
        platforms: ["desktop"],
        image: "https://c8.alamy.com/comp/2PR9785/businessman-hand-world-virtual-screen-erp-enterprise-resource-planning-digital-technology-connection-icon-concept-2PR9785.jpg"
    },
    {
        id: uuid(),
        name: "API Service",
        type: "service",
        platforms: ["web"],
        image: "https://c8.alamy.com/comp/2PR9785/businessman-hand-world-virtual-screen-erp-enterprise-resource-planning-digital-technology-connection-icon-concept-2PR9785.jpg"
    },
    {
        id: uuid(),
        name: "Cloud Hosting",
        type: "service",
        platforms: ["web"],
        image: "https://c8.alamy.com/comp/2PR9785/businessman-hand-world-virtual-screen-erp-enterprise-resource-planning-digital-technology-connection-icon-concept-2PR9785.jpg"
    },
    {
        id: uuid(),
        name: "Data Backup",
        type: "service",
        platforms: ["web"],
        image: "https://c8.alamy.com/comp/2PR9785/businessman-hand-world-virtual-screen-erp-enterprise-resource-planning-digital-technology-connection-icon-concept-2PR9785.jpg"
    },
];

export default dummyProducts;

