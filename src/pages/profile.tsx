import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout'
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import fetcher from '@/lib/fetcher';


function CityInput(props: { name: string, type: string, label: string }) {
    const [field, meta, helpers] = useField(props.name);
    const [cityList, setCityList] = useState<{ id: string, name: string }[]>([]);
    const [initialTyping, setInitialTyping] = useState<boolean>(true);
    const { value } = field;
    const { setValue } = helpers;
    // console.log({ ...field }, "field propss")
    useEffect(() => {
        console.log(value, "changing")

        const timer = setTimeout(() => {
            if (value) {
                console.log('this execs')
                fetcher(`/api/address?city=${value}`).then(res => {

                    console.log(res, "from api");
                    if(initialTyping){
                        setCityList(res?.cities)
                    }
                   else if (cityList.length !== 0 && value !== res.cities[0].name) {
                        setCityList(res?.cities)
                    }
                })
            }
            else if (!value) {
                setCityList([])
                setInitialTyping(true)
            }
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value])

    const handleCitySelect = (citySelected: string) => {
        // console.log(setValue(citySelected))

        setValue(citySelected)
        setCityList([]);
        setInitialTyping(false)
        // setSelectedFlag(true)
    }

    return (
        <>
            <div className='flex flex-col text-xl gap-1 mb-2 md:w-[45%] relative'>
                <label htmlFor={props.label} className='font-medium'>City<span className='ml-1 text-pink-500'>*</span></label>
                <input {...field} {...props} className='profile_form_field ' autoComplete="off" />
                {meta.error && meta.touched && <div className='font-semibold text-sm text-pink-700'>{meta.error}</div>}
                <div className='absolute top-20 w-full rounded-md'>
                    {cityList?.map(city => <li className='list-none font-medium text-md w-full p-1 bg-white active:bg-cyan-200 hover:bg-slate-200 ' key={city.id} onClick={() => handleCitySelect(city.name)}>{city.name}</li>)}
                </div>
            </div>

        </>
    )
}


const profilepage = () => {

    const statesInIndia = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ];




    return (
        <div className=' min-h-screen bg-slate-200'>
            <Layout>


                <Formik
                    initialValues={{ addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '', country: '' }}
                    validationSchema={Yup.object({
                        addressLine1: Yup.string()
                            .max(150, 'Must be 150 characters or less')
                            .required('Required'),
                        addressLine2: Yup.string()
                            .max(150, 'Must be 150 characters or less')
                        ,
                        city: Yup.string().required('Required'),
                        state: Yup.string().required("Required"),
                        postalCode: Yup.number().lessThan(1000000, "must contain 6 digits").moreThan(10000, "must contain 6 digits").required("Required").typeError("Postal code must be a number"),
                        country: Yup.string().required("Required")
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    <Form className='flex flex-col lg:w-1/2  md:w-2/3 w-[90%] rounded-md flex-wrap m-auto bg-white p-6 top-6 relative'>
                        <div className='flex flex-col text-xl gap-1 mb-2'>
                            <label htmlFor="addressLine1" className='font-medium '>Address Line 1<span className='ml-1 text-pink-500'>*</span></label>
                            <Field name="addressLine1" type="text" className="profile_form_field" />
                            <ErrorMessage name="addressLine1" className='font-semibold text-sm text-pink-700' />
                        </div>

                        <div className='flex flex-col text-xl gap-1 mb-2'>
                            <label htmlFor="addressLine2" className='font-medium'>Address Line 2</label>
                            <Field name="addressLine2" type="text" className="profile_form_field" />
                            <ErrorMessage name="addressLine2" className='font-semibold text-sm text-pink-700' />
                        </div>


                        <div className='flex md:flex-row flex-col flex-wrap justify-between'>

                            <CityInput name="city" type="text" label="city" />

                            <div className='flex flex-col text-xl gap-1 mb-2 md:w-[45%]'>
                                <label htmlFor="state" className='font-medium'>State<span className='ml-1 text-pink-500'>*</span></label>
                                <Field name="state" as="select" className="profile_form_field" >
                                    {statesInIndia.map((state, index) => <option key={index} value={state} className='text-black'>{state}</option>)}
                                </Field>
                                <ErrorMessage name='state' className='font-semibold text-sm text-pink-700' />
                            </div>
                            <div className='flex flex-col text-xl gap-1 mb-2 md:w-[45%]'>
                                <label htmlFor="postalCode" className='font-medium'>Postal Code<span className='ml-1 text-pink-500'>*</span></label>
                                <Field name="postalCode" type="text" className="profile_form_field" />
                                <ErrorMessage name='postalCode' className='font-semibold text-sm text-pink-700' />
                            </div>

                            <div className='flex flex-col text-xl gap-1 mb-2 md:w-[45%]'>
                                <label htmlFor="country" className='font-medium'>Country<span className='ml-1 text-pink-500'>*</span></label>
                                <Field name="country" type="text" className="profile_form_field" />
                                <ErrorMessage name='country' className='font-semibold text-sm text-pink-700' />
                            </div>

                        </div>
                        <button type="submit" className='mt-2 w-full rounded-md bg-cyan-500 hover:text-white p-3 font-medium text-xl active:bg-gradient-to-b from-cyan-600 to-cyan-500 text-gray-200'>Submit</button>
                    </Form>
                </Formik>


            </Layout>
        </div>
    );
};

export default profilepage;