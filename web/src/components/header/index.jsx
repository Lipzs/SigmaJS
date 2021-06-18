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
          <DrawerBody>
            <Avatar
              name="Felipe Bruckmann"
              src="https://avatars.githubusercontent.com/u/13594618?v=4"
              size="xl"
            />
          </DrawerBody>
          <DrawerFooter>
           
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
