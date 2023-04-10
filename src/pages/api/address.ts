import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb'
import Email from 'next-auth/providers/email';
import { Address } from '@prisma/client';

interface MyUser {
    city: string;
    userId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const citiesInIndia = [

            "mumbai",
            "delhi",
            "bangalore",
            "hyderabad",
            "ahmedabad",
            "chennai",
            "kolkata",
            "surat",
            "pune",
            "jaipur",
            "lucknow",
            "kanpur",
            "nagpur",
            "visakhapatnam",
            "bhopal",
            "patna",
            "ludhiana",
            "agra",
            "nashik",
            "vadodara",
            "faridabad",
            "meerut",
            "rajkot",
            "varanasi",
            "srinagar",
            "aurangabad",
            "dhanbad",
            "amritsar",
            "navi mumbai",
            "allahabad",
            "howrah",
            "gwalior",
            "jabalpur",
            "coimbatore",
            "vijayawada",
            "jodhpur",
            "madurai",
            "raipur",
            "kota",
            "guwahati",
            "chandigarh",
            "solapur",
            "hubli-dharwad",
            "bareilly",
            "moradabad",
            "mysore",
            "gurgaon",
            "aligarh",
            "jalandhar",
            "tiruchirappalli",
            "bhubaneswar",
            "salem",
            "mira-bhayandar",
            "thiruvananthapuram",
            "bhiwandi",
            "saharanpur",
            "gorakhpur",
            "guntur",
            "bikaner",
            "amravati",
            "noida",
            "jamshedpur",
            "bhilai",
            "warangal",
            "cuttack",
            "firozabad",
            "kochi",
            "bhavnagar",
            "dehradun",
            "durgapur",
            "asansol",
            "nanded",
            "waghala",
            "kolhapur",
            "ajmer",
            "gulbarga",
            "jamnagar",
            "ujjain",
            "loni",
            "siliguri",
            "jhansi",
            "ulhasnagar",
            "jammu",
            "sangli-miraj & kupwad",
            "mirzapur",
            "kurnool",
            "nellore",
            "belgaum",
            "mangalore",
            "ambattur",
            "tirunelveli",
            "malegaon",
            "gaya",
            "jalgaon",
            "udaipur",
            "thrissur",
            "alwar",
            "ranchi",
            "beawar"
        ];




        const { city, userId }: Partial<MyUser> = req.query
       
      
        if (city) {
            const cityString: string = typeof city === "string" ? city : ""
            let matchingList = []
            for (var i = 0; i < citiesInIndia.length; i++) {
                // console.log(i)
                if (citiesInIndia[i].startsWith(cityString.toLowerCase())) {
                    matchingList.push({ id: i, name: citiesInIndia[i] })
                    console.log(citiesInIndia[i], true)

                }
            }
            // await new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         return resolve
            //     }, 300)
            // })
            console.log(matchingList, "list")
            res.status(200).json({ cities: matchingList })
            return
        }

        else if (userId) {
            const result = await prismadb.address.findFirst({
                where: {
                    userId: userId
                },
               
            })
            return res.status(200).json({ result })
        }

        return res.status(200).send({ message: "empty query" })

    }


    if (req.method === "POST") {
        const { userId, addressLine1, addressLine2, city, state, postalCode, landmark, email }: Address = req.body;
        try {


            const result = await prismadb.address.upsert({
                create: {

                    addressLine1: addressLine1,
                    addressLine2: addressLine2,
                    city: city,
                    postalCode: postalCode,
                    state: state,
                    landmark: landmark,
                    userId: userId,
                    email: email

                },
                update: {
                    addressLine1: addressLine1,
                    addressLine2: addressLine2,
                    city: city,
                    postalCode: postalCode,
                    state: state,
                    landmark: landmark,
                },

                where: {
                    email: email
                }
            })

            return res.status(200).send({ message: "succesfully inserted address", result })
        } catch (err) {
            console.log(err)
            return res.status(500).send({ message: "something went wrong", err })
        }
    }
}


// id           String  @id @default(auto()) @map("_id") @db.ObjectId
// addressLine1 String
// addressLine2 String?
// city         String
// state        String
// postalCode   Int
// landmark     String?
// User         User?   @relation(fields: [userId], references: [id], onDelete: Cascade)
// userId       String  @db.ObjectId
