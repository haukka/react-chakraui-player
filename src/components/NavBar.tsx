import React from 'react';
import { Flex, Image, Input, InputGroup, InputLeftElement, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import logo_dark from '../img/logo_dark.png';
import { IoIosAdd, IoIosMoon, IoIosSearch, IoIosSunny } from 'react-icons/io';

const NavBar = ({ setsearchTerm, searchTerm }: any) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue('gray.600', 'gray.300');
    const navigate = useNavigate();

    return (
        <>
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                width={'100vw'}
                p={'4'}
                paddingLeft={'20px'}
            >
                <Link to={'/'}>
                    <Image src={colorMode === 'light' ? logo : logo_dark} width={'50px'} height={'50px'} />
                </Link>
                <InputGroup mx={6} width={'60vw'}>
                    <InputLeftElement
                        pointerEvents={'none'}
                        children={<IoIosSearch fontSize={25} />}
                    />
                    <Input type={'text'} placeholder='Search...' fontSize={18} variant={'filled'} fontWeight={'medium'} value={searchTerm}
                        onChange={(e) => setsearchTerm(e.target.value)}
                        onFocus={() => navigate("/search")} />
                </InputGroup>
                <Flex justifyContent={'center'} alignItems={'center'}>
                    <Flex width={'40px'} height={'40px'} justifyContent={'center'} alignItems={'center'}>
                        <Flex width={'40px'} height={'40px'} borderRadius={'5px'} cursor={'pointer'} alignItems={'center'} justifyContent={'center'} onClick={toggleColorMode}>
                            {colorMode === 'light' ? <IoIosMoon fontSize={25} /> : <IoIosSunny fontSize={25} />}
                        </Flex>
                    </Flex>
                    <Link to={'/create'}>
                        <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            bg={bgColor}
                            width={'40px'}
                            height={'40px'}
                            borderRadius={'5px'}
                            mx={6}
                            cursor={'pointer'}
                            _hover={{ shadow: "md" }}
                            transition="ease-in-out"
                            transitionDuration={"0.3s"}
                        >
                            <IoIosAdd
                                fontSize={25}
                                color={`${colorMode === 'dark' ? '#111' : '#f1f1f1'}`}
                            />
                        </Flex>
                    </Link>
                </Flex>
            </Flex>
        </>
    );
};

export default NavBar;