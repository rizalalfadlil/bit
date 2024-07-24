import React, { useState, useEffect } from 'react';
import { Input, Progress, Image, Tooltip, Button } from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  LoadingOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const App = () => {
  const [nama, setNama] = useState('');
  const [teksNama, setTeksNama] = useState(nama);
  const [hasil, setHasil] = useState(null);
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teksHasil, setTeksHasil] = useState('teks');
  const [image, setImage] = useState();

  const twoColors = {
    '100%': '#FF8076',
    '50%': '#FFEA76',
    '0%': '#4AFF91',
  };
    const hitungKesejahteraan = () => {
      setLoading(true);
      setTeksNama(nama);
      
      // Menggunakan fungsi hash sederhana untuk menghasilkan nilai acak yang konsisten berdasarkan nama
      const hash = (str) => {
        let hashValue = 0;
        if (str.length === 0) return hashValue;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hashValue = (hashValue << 5) - hashValue + char;
          hashValue = hashValue & hashValue; // Convert to 32bit integer
        }
        return Math.abs(hashValue % 101); // Ambil nilai mutlak dan batasi ke rentang 0-100
      };
      
      const persentaseKarbit = hash(nama);
      setHasil(persentaseKarbit);

      if(persentaseKarbit >= 80){
        setTeksHasil('bit karbittt... Raja karbit Dewa karbit bit... bit...')
        setColor('dark');
        setImage('5.jpeg');
      }else if(persentaseKarbit <80 && persentaseKarbit >= 60){
        setTeksHasil('ini dia Raja karbit');
        setColor('danger');
        setImage('4.jpeg')
      }else if(persentaseKarbit <60 && persentaseKarbit >= 40){
        setTeksHasil('Lu karbit');
        setColor('danger');
        setImage('3.jpeg');
      }else if(persentaseKarbit <40 && persentaseKarbit >= 20){
        setTeksHasil('Kok kamu karbit bang?')
        setColor('warning');
        setImage('2.jpeg')
      }else {
        setTeksHasil('Kamu setia');
        setColor('success');
        setImage('1.gif');
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

  return (
    <div className="App bg-secondary bg-opacity-25">
      <div className='p-2 d-flex align-items-center justify-content-center' style={{height:'100vh'}}>
      <div className='border p-5 container bg-light rounded'>
      <h1 className='fw-bold'>Seberapa karbit kamu</h1>
      <h3 className='text-secondary fw-light'>Tulis namamu</h3>
      <div className='row'>
      <Input
        placeholder="Tulis Nama"
        value={nama}
        className='rounded-pill'
        onChange={(e) => setNama(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Button type='primary' disabled={nama.length < 3} className='rounded-pill' onClick={hitungKesejahteraan}>{(nama.length < 3 && nama !=="")?"minimal 3 karakter":"hitung"}</Button>
      </div>
      <div className='mt-3'>
      {loading ? (
        <LoadingOutlined style={{scale:'2', color:'#4A95FF'}}/>
      ) : (
        (hasil !== null) && (
          <>
          <Progress percent={hasil} className="rounded-0" size={['default', 30]} format={(percent) => percent} strokeColor={twoColors}/>
          <div className='row fw-bold mt-2 '>
            <span className='col text-start text-success'>setia</span>
            <span className='col text-end text-danger'>karbit</span>
          </div>
          <h5 className='text-uppercase'>{teksNama} {hasil}%, Kamu...</h5>
          <h1 className={`text-${color} fw-bold`}>{teksHasil}</h1>
          <Image src={image} preview={false} width={200} style={{maxHeight:'250px'}}/>
          <p className='text-end w-100'><Tooltip title='hanya untuk candaan dan bukan beneran'><InfoCircleOutlined/></Tooltip></p>
          </>
        )
      )}
      
      
      </div>
      </div>
      </div>
    </div>
  );
};

export default App;
