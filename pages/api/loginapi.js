import { MercoaClient } from '@mercoa/javascript';


export default async function handler(req, res) {
    var isEmpty = function(obj) {
        return Object.keys(obj).length === 0;
    }
      
    if(isEmpty(req.body)){
        return res.status(400).json({ message: "Bad Request" });
    }

    const requestBody = req.body;
    const business_name = requestBody.ent_name;
    console.log({ business_name });


    const api_key = "5942e421158c4d42b0254a0508bb61df"
    const mercoa_client = new MercoaClient({
        token : api_key
    });

    const foreignIdHasher = (business_name) => {
        return business_name.replace(/\s+/g, '-').toLowerCase();
    }

    console.log(foreignIdHasher(business_name));

    var entity;
    var entity_id;
    //create entitty if it doesnrt already exist

    entity = await mercoa_client.entity.find({
        isCustomer: true,
        foreignId: foreignIdHasher(business_name),
        paymentMethods: true
    });

    if(entity.data.length == 0){
        console.log("Creating entity");
        try {
            entity = await mercoa_client.entity.create({
            isCustomer: true,
            isPayor: true,
            isPayee: false,
            accountType: "business",
            foreignId: foreignIdHasher(business_name), 
            profile: {
                business: {
                    email: `customer@${business_name}.com`,
                    legalBusinessName: business_name,
                    website: "",
                    businessType: "llc",
                    phone: {
                        countryCode: "1",
                        number: "4155551234"
                    },
                    address: {
                        addressLine1: "123 Main St",
                        addressLine2: "Unit 1",
                        city: "San Francisco",
                        stateOrProvince: "CA",
                        postalCode: "94105",
                        country: "US"
                    },
                    taxId: {
                        ein: {
                            number: "12-3456789"
                        }
                    }
                    }
                }
            });
            entity_id = entity.id;
        }
        catch(e){
            console.log(e);
            return res.status(500).json({ message: "Error retrieving token!" });
        }
    }
    else{
        console.log("Entity already exists!");
        entity_id = entity.data[0].id;
    }

    const token = await mercoa_client.entity.getToken(entity_id, {
        pages: {
            paymentMethods: true,
        },
    });

    return res.status(200).json({token: token, entityId: entity_id});
}