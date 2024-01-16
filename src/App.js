import React, { useState, useEffect } from 'react';
import { Input, Progress, Result, Spin } from 'antd';
import './App.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  LoadingOutlined,
} from '@ant-design/icons';

const App = () => {
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);
  const [teksHasil, setTeksHasil] = useState(null);
  const [loading, setLoading] = useState(false);

  const twoColors = {
    '0%': '#FF8076',
    '50%': '#FFEA76',
    '100%': '#4AFF91',
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
        setTeksHasil('good')
      }else if(persentaseBaik <200/3 && persentaseBaik >100/3){
        setTeksHasil('ok')
      }else{
        setTeksHasil('bad');
      }
      
      // Tambahkan delay sebelum loading dihilangkan (contoh: 2 detik)
      setLoading(false);
    };

    if (nama) {
      hitungKesejahteraan();
    }
  }, [nama]);

  return (
    <div className="App">
      <div className='container p-2 mt-5'>
      <div className='border p-5'>
      <h1 className='mb-5'>?</h1>
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
          <div className='row fw-bold mt-2'>
            <span className='col text-start text-danger'>bad</span>
            <span className='col text-end text-success'>good</span>
          </div>
          <h1>{teksHasil}</h1>
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
