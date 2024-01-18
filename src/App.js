import React, { useState, useEffect } from 'react';
import { Input, Progress, Result, Spin, Image } from 'antd';
import './App.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  LoadingOutlined,
} from '@ant-design/icons';

const App = () => {
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const TeksHasil = () =>{
    if(color === 'success')return 'good';
    else if (color === 'warning')return 'ok';
    else return 'bad';
  }

  const twoColors = {
    '100%': '#FF8076',
    '50%': '#FFEA76',
    '0%': '#4AFF91',
  };

  useEffect(() => {
    const hitungKesejahteraan = () => {
      setLoading(true);

      

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
      
      const persentaseBaik = hash(nama);
      setHasil(persentaseBaik);
      if(persentaseBaik > 200/3){
        setColor('success')
      }else if(persentaseBaik <200/3 && persentaseBaik >100/3){
        setColor('warning')
      }else{
        setColor('danger');
      }
      
      // Tambahkan delay sebelum loading dihilangkan (contoh: 2 detik)
      setLoading(false);
    };

    if (nama) {
      hitungKesejahteraan();
    }
  }, [nama]);

  return (
    <div className="App bg-secondary bg-opacity-25">
      <div className='p-2 d-flex align-items-center justify-content-center' style={{height:'100vh'}}>
      <div className='border p-5 container bg-light rounded'>
      <h1 className='fw-bold'>Title</h1>
      <h3 className='mb-5 text-secondary fw-light'>subtitle</h3>
      <Input
        placeholder="Tulis Nama"
        value={nama}
        className='rounded-pill'
        onChange={(e) => setNama(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <div className='mt-3'>
      {loading ? (
        <LoadingOutlined style={{scale:'2', color:'#4A95FF'}}/>
      ) : (
        hasil !== null && (
          <>
          <Progress percent={hasil} className="rounded-0" size={['default', 30]} format={(percent) => percent} strokeColor={twoColors}/>
          <div className='row fw-bold mt-2 '>
            <span className='col text-start text-success'>good</span>
            <span className='col text-end text-danger'>bad</span>
          </div>
          <h1 className={`text-${color}`}><TeksHasil/></h1>
          <Image src='logo192.png' preview={false}/>
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
