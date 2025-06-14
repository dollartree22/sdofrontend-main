import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import context from '../context/context';
import { toast } from 'react-toastify';
import Loading from "../components/loading"
import "./profile.css"

const Deposit = () => {
    const [amount, setamount] = useState();
    const [image, setimage] = useState({
        url: null,
        public_id: null
    })
    const a = useContext(context);
    const deposit = a.deposit
    const uploadimg = a.uploadimg
    const delimg = a.delimg
    const [imgloading, setimgloading] = useState(false)
    const [loading, setloading] = useState(false)
    function copyToClipboard(text) {
        // Create a temporary input element to copy the text
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }
    const handlesubmit = async () => {
        setloading(true);
        if (amount < 30 || !amount) {
            return toast.error('Minimum Amount is 30usdt', {
                position: "top-center"
            })
        };
        await deposit({ amount, image })
        setloading(false);
    }
    const handleImageUpload = async (e) => {
        setimgloading(true)
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = async () => {
            const result = await uploadimg({ file: reader.result });
            if (result) {
                setimage({
                    url: result.data.url,
                    public_id: result.data.public_id,
                })
            }
            setimgloading(false)
        };
        reader.readAsDataURL(file);
    };
    return (
        <div className='container' style={{ color: "white", paddingTop: "15vh" }}>
            <h1>Deposit</h1>
            <p>Send payment to this address and then submit and after that our team will verify the amount</p>
            <div className='d-flex align-items-center justify-content-center'>
                <img width={300} style={{ background: "white" }} src="/image.jpg" alt="scan this qrcode" />
            </div>
            <div className='d-flex align-items-center justify-content-center my-3'>
                <p className='mx-2' style={{ marginBottom: "0" }}>USDT(BEP20) 0x25565032d2e44cd7cae755259298de7046dc1805</p>
                <i onClick={() => { copyToClipboard('0x4fc67c310f5bb290db4cf13bff3f79bc7259a825') }} class="fa-solid fa-copy fa-lg pointer"></i>
            </div>
            <Form className='d-flex align-items-center justify-content-center my-4'>
                <Form.Group controlId="formTitle">
                    <div className='itemimg'>

                        {
                            imgloading ? <Loading /> : <>
                                <div style={{ position: "relative" }}>
                                    {
                                        image.url && <>
                                            <img src={image.url} alt="Item Image" />
                                            <span className='pointer' style={{ position: "absolute", top: "0", right: "0", color: "white" }} onClick={() => {
                                                delimg({ public_id: image.public_id })
                                                setimage({
                                                    url: null,
                                                    public_id: null
                                                })
                                            }}>&#10006;</span></>
                                    }
                                </div> <Form.Group controlId="formTitle">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        style={{ height: "auto" }}
                                        type="file"
                                        name="image"
                                        onChange={handleImageUpload}
                                    />
                                </Form.Group>
                            </>
                        }
                    </div>
                    <Form.Control
                        className='my-3 mx-auto'
                        type="number"
                        name="amount"
                        value={amount}
                        placeholder='Amount in USDT'
                        style={{ maxWidth: "20rem" }}
                        onChange={(e) => setamount(e.target.value)}
                    />
                    <small>Minimum Amount 30usdt</small>
                </Form.Group>
                <button disabled={loading} onClick={(handlesubmit)} className='mx-3 btn'>
                    {!loading?"Submit":"Loading..."}
                </button>
            </Form>
        </div>
    )
}

export default Deposit
