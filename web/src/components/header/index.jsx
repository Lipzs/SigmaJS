import React, { useState } from 'react';
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
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

  return (
    <div className="header">
      <div className="logo">
        <h1>SIGMA</h1>
      </div>
      <div className="user">
        <Menu>
          <MenuButton as={Button}>Felipe Bruckmann</MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Perfil
            </MenuItem>
            <MenuItem>Sair</MenuItem>
          </MenuList>
        </Menu>
        <Avatar
          name="Felipe Bruckmann"
          src="https://avatars.githubusercontent.com/u/13594618?v=4"
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
                name="Felipe Bruckmann"
                src="https://avatars.githubusercontent.com/u/13594618?v=4"
                size="xl"
              />
            </div>
            <div className="name">
              <label>Nome</label>
              <p>Felipe Bruckmann</p>
            </div>
            <div className="email">
              <label>E-mail</label>
              <p>felipebruckmann@hotmail.com.br</p>
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
