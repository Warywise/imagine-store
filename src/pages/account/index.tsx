import React, { useContext, useEffect, useState } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import { MainContext } from '../../context/mainContext';
import { UserContext } from '../../context/userContext';

import './styles/index.scss';

export default function Account() {
  const { active, setActive } = useContext(MainContext);
  const { purchases, user } = useContext(UserContext);
  const [key, setKey] = useState('infos');
  
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!active) navigateTo('/auth/login', { replace: true });
  }, [active]);

  return (
    <div>
      <Header />
      <h2>My Account</h2>
      <section className='account-section'>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(key) => setKey(key as string)}
          className="mb-3"
        >
          <Tab eventKey="infos" title="Infos" className='account-tab-item'>
            <h5>Name:</h5>
            <p>{user.name}</p>
            <h5>Email:</h5>
            <p>{user.email}</p>
            <h5>Cpf:</h5>
            <p>{user.cpf ?? 'Not registered'}</p>
            <hr />
            <div className='account-tab-buttons'>
              <Button type='button' onClick={() => setKey('update')}>Edit Infos</Button>
              <Button variant='btn btn-warning'>Logout</Button>
            </div>
          </Tab>
          <Tab eventKey="purchases" title="Purchases">
      
          </Tab>
          <Tab eventKey="update" title="Update Infos" disabled>
            
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}
