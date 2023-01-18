import { Button, Flex, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, useColorMode, Text, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { AiOutlineLink } from 'react-icons/ai';
import { categories } from '../data/categoriesData';
import { addMusic, addTwichVideo, addVideo } from '../store/linkSlice';
import { useAppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState("Choose as category");
    const [url, setUrl] = useState("");
    const { colorMode } = useColorMode();
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const buttonSize = useBreakpointValue(['xs', 'md', 'lg']);
    const [isSmallScreenButton] = useMediaQuery("(max-width: 910px)");

    const handleTitle = (e: any) => {
        setTitle(e.target.value)
    }

    const handleCreate = async () => {
        setLoading(true);
        let res;
        if (url && title && category) {
            if (category.toLowerCase() === 'music') {
                res = await dispatch(addMusic({ title, url }));
            } else if (category.toLowerCase() === 'video') {
                res = dispatch(addVideo({ title, url }));
            } else if (category.toLowerCase() === 'games') {
                res = dispatch(addTwichVideo({ title, url }));
            }
            if (res) {
                setLoading(false);
                navigate('/category/' + category.toLowerCase());
            }
        } else {
            setLoading(false);
        }
    }

    return (
        <Flex
            justifyContent={"center"}
            alignItems="start"
            width={"full"}
            minHeight="100vh"
            padding={10}
        >
            <Flex
                width={"80%"}
                height="full"
                border={"1px"}
                borderColor="gray.300"
                borderRadius={"md"}
                p="4"
                flexDirection={"column"}
                alignItems="center"
                justifyContent={"center"}
                gap={2}
            >
                <Input
                    variant={"flushed"}
                    placeholder="Title"
                    focusBorderColor="gray.400"
                    isRequired
                    errorBorderColor="red"
                    type={"text"}
                    _placeholder={{ color: "gray.500" }}
                    fontSize={20}
                    value={title}
                    onChange={handleTitle}
                />

                <Flex
                    justifyContent={"space-between"}
                    width="full"
                    direction={isSmallScreenButton ? 'column' : 'row'}
                    alignItems={"center"}
                    gap={8}
                    my={4}
                >
                    <Menu>
                        <MenuButton
                            width={"full"}
                            colorScheme="blue"
                            as={Button}
                            rightIcon={<IoChevronDown fontSize={25} />}
                        >
                            {category}
                        </MenuButton>
                        <MenuList zIndex={101} width={"md"} shadow="xl">
                            {categories &&
                                categories.map((data) => (
                                    <MenuItem
                                        key={data.id}
                                        _hover={{ bg: "blackAlpha.300" }}
                                        fontSize={20}
                                        px={4}
                                        onClick={() => setCategory(data.name)}
                                    >
                                        {data.iconSrc}{" "}
                                        <Text fontSize={18} ml={4}>
                                            {data.name}
                                        </Text>
                                    </MenuItem>
                                ))}
                        </MenuList>
                    </Menu>

                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={
                                <AiOutlineLink
                                    fontSize={20}
                                    color={`${colorMode === "dark" ? "#f1f1f1" : "#111"}`}
                                />
                            }
                        />
                        <Input
                            variant={"flushed"}
                            placeholder="Url"
                            focusBorderColor="gray.400"
                            isRequired
                            errorBorderColor="red"
                            type={"text"}
                            _placeholder={{ color: "gray.500" }}
                            fontSize={20}
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </InputGroup>
                </Flex>

                <Button
                    isLoading={loading}
                    loadingText="Inserting"
                    colorScheme={"linkedin"}
                    width={isSmallScreenButton ? '' : "xl"}
                    size={buttonSize}
                    variant={`${loading ? "outline" : "solid"}`}
                    _hover={{ shadow: "lg" }}
                    fontSize={20}
                    onClick={handleCreate}
                >
                    Create
                </Button>
            </Flex>
        </Flex>
    );
};

export default Create;