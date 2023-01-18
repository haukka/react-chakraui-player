import { Flex, Show } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from '../components/Category';
import Create from '../components/Create';
import Feed from '../components/Feed';
import NavBar from '../components/NavBar';
import Search from '../components/Search';
import { categories, ICategory } from '../data/categoriesData';
import { useMediaQuery } from "@chakra-ui/media-query";

const Home = () => {
    const [isSmallScreen] = useMediaQuery("(max-width: 669px)");

    return (
        <>
            <NavBar />
            <Flex width={'100vw'} height={'100%'} flexDirection={isSmallScreen ? 'column' : 'row'}>
                <Show breakpoint='(min-width: 670px)'>
                    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} width={'20'} minHeight={'100%'}>
                        {
                            categories && categories.map((category: ICategory) => {
                                return (
                                    <Category key={category.id} data={category} />
                                );
                            })
                        }
                    </Flex>
                </Show>
                <Show breakpoint='(max-width: 669px)' >
                    <Flex direction={'row'} justifyContent={'space-evenly'} alignItems={'start'} width={'100%'} minHeight={'10%'}>
                        {
                            categories && categories.map((category: ICategory) => {
                                return (
                                    <Category key={category.id} data={category} />
                                );
                            })
                        }
                    </Flex>
                </Show>
                <Flex
                    width={"95%"}
                    px={4}
                    justifyContent="center"
                    alignItems={"start"}
                >
                    <Routes>
                        <Route path='/' element={<Feed />} />
                        <Route path='/category/:categoryId' element={<Feed />} />
                        <Route path='/create' element={<Create />} />
                        <Route path='/search' element={<Search />} />
                    </Routes>
                </Flex>
            </Flex>
        </>
    );
};

export default Home;