import { Box, Flex, Tooltip, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ICategory } from '../data/categoriesData';

const Category = ({ data }: { data: ICategory }) => {
    const bgColor = useColorModeValue('gray.600', 'gray.300');

    return (
        <>
            <Flex cursor={'pointer'} my={'5'}>
                <Link to={`/category/${data.name.toLowerCase()}`}>
                    <Tooltip hasArrow placement='right' closeDelay={300} arrowSize={5} label={data.name} bg={bgColor}>
                        <Box>
                            {data.iconSrc}
                        </Box>
                    </Tooltip>
                </Link>
            </Flex>
        </>
    );
};

export default Category;