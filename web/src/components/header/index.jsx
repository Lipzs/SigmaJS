import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { FiMenu, FiLogOut, FiUser } from "react-icons/fi";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import image from '../../assets/undraw_true_friends_c94g.svg';

import './styles.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();


  const history = useHistory();

  function logout() {
    history.push('/');
    setCurrentUser(null);
  }

  return (
    <div className="header">
      <div className="logo">
        <h1>SIGMA</h1>
      </div>
      <div className="user">
        <Menu>
          <MenuButton as={IconButton} icon={<FiMenu/>} />
          <MenuList>
            <MenuItem
              onClick={() => {
                setIsOpen(true);
              }}
              icon={<FiUser/>}
            >
              Perfil
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
              }}
              icon={<FiLogOut/>}
            >
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
        <Avatar
          name={currentUser.name}
          src={currentUser.photo ? currentUser.photo : ''}
          size="md"
        />
      </div>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          setIsOpen(false);
        }}
        colorScheme="whatsapp"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Minha conta</DrawerHeader>
          <DrawerBody className="drawerBody">
            <div className="drawerAvatar">
              <Avatar
                name={currentUser.name}
                src={currentUser.photo ? currentUser.photo : ''}
                size="xl"
              />
            </div>
            <div className="name">
              <label>Nome</label>
              <p>{currentUser.name}</p>
            </div>
            <div className="email">
              <label>E-mail</label>
              <p>{currentUser.email}</p>
            </div>
            <div className="drawerImg"></div>
          </DrawerBody>
          <DrawerFooter className="drawerFooter">
            <img src={image} alt="Duas crianças indo para escola" />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
