import DispatchDetails from "../models/DispatchSchema.js";
import Packing from "../models/SaleSchema.js";
export const report = async (req, res) => {

    const packing = await Packing.findOne().sort({ $natural: -1 });
    console.log(packing);
    const numberOfSale = packing.saleNo;
    try {
        let record = await DispatchDetails.findOne({ numberOfSale });

        if (record) {

            return res.status(200).json({
                success: true,
                message: 'Successfully data fatched',
                data: record,
            });
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, err: err.message });
    }
};
