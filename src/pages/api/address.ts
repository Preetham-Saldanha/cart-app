import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb'

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




        const { city } = req.query
        if (typeof city !== 'string' || !city.trim()) {
            res.status(400).send('City parameter is missing or invalid');
            return;
        }
        console.log(city, "city")
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
            console.log(matchingList,"list")
            res.status(200).json({ cities: matchingList })
            return
        }

        res.status(200).send({ message: "empty query" })

    }
}

