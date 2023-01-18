import { Box, Button, Flex, Text, useColorModeValue, Hide, Input, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromPlaylist } from '../store/linkSlice';
import { DeleteIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';

const Feed = () => {
    const { categoryId } = useParams();
    const inputElement: any = useRef();
    const [url, setUrl] = useState('');

    let elements = useAppSelector((state: any) => {
        if (categoryId?.toLocaleLowerCase() === 'music') {
            return (state.music.length > 0) ? state.music : [{ id: 0, url: 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3', current: false, title: 'Musique symphonique' }];
        } else if (categoryId?.toLocaleLowerCase() === 'games') {
            return (state.twitch.length > 0) ? state.twitch : [{ id: 0, url: 'https://www.twitch.tv/kronovi', current: false, title: 'twitch' }];
        }
        else if (categoryId?.toLocaleLowerCase() === 'video') {
            return (state.video.length > 0) ? state.video : [{ id: 0, url: 'https://www.youtube.com/watch?v=q2EZHI8abgU', current: false, title: 'Vidéo de chat' }];
        }
    });
    const bgBox = useColorModeValue("blue.100", "blue.700");
    const dispatch = useAppDispatch();
    const findCurrentElement = elements?.find((element: any) => element.current === true);
    const [currentElement, setCurrentElement] = useState<any>();
    const [loop, setLoop] = useState(false);
    const [isSmallScreenButton] = useMediaQuery("(max-width: 958px)");

    const handleLoopButton = () => {
        setLoop(!loop);
    }

    const handleSelection = (id: string) => {
        let elementTmp = elements.find((element: any) => element.id === id);
        setCurrentElement(elementTmp);
    }

    const handleRemove = (id: string) => {
        let elementsTmp = elements.filter((element: any) => element.id !== id);
        dispatch(removeFromPlaylist({ id, category: categoryId?.toLowerCase() }));
        if (elementsTmp.length > 0) {
            setCurrentElement(elementsTmp[0]);
        }
    }

    useEffect(() => {
        let element;
        if (elements && elements.length > 0) {
            if (findCurrentElement) {
                element = findCurrentElement;
            } else {
                element = elements[0];
            }
        }
        setCurrentElement(element);
    }, [elements, findCurrentElement, categoryId]);

    const handleOnEnd = () => {
        if (loop === false) {
            const indexCurrentElement = elements.findIndex((element: any) => element.id === currentElement.id);
            if (indexCurrentElement < elements.length - 1) {
                setCurrentElement(elements[indexCurrentElement + 1]);
            } else {
                setCurrentElement(elements[0]);
            }
        }
    }

    return (
        <>
            <Flex width={"100%"} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                <Flex position={'relative'} top={'40px'} left={'10px'} width={currentElement ? '70%' : '100%'} direction={'column'} justifyContent={'center'} alignItems={'center'} minHeight={'100%'}>
                    {currentElement ? <>
                        <Box textAlign={'center'} justifyContent={'center'} alignItems={'center'}>
                            <ReactPlayer controls={true} url={currentElement.url} playing loop={loop} onEnded={handleOnEnd} />
                            <Button
                                colorScheme={"linkedin"}
                                width={"sm"}
                                _hover={{ shadow: "lg" }}
                                fontSize={20}
                                onClick={handleLoopButton}
                                marginTop={'20px'}
                                textAlign={'center'}
                            >
                                {!loop ? 'Auto repeat this video' : 'Stop the loop'}
                            </Button>
                        </Box>
                    </> : <>
                        <Box width={"100%"} textAlign={'center'} justifyContent={'center'} alignItems={'center'}>
                            <Flex
                                width={"100%"}
                                height="full"
                                borderColor="gray.300"
                                borderRadius={"md"}
                                p="4"
                                flexDirection={"column"}
                                alignItems="center"
                                justifyContent={"center"}
                                gap={2}
                                marginLeft={'90px'}
                            >
                                <ReactPlayer style={{ 'background': 'rgba(0,0,0,.1)' }} controls={true} url={url} playing loop={loop} />
                            </Flex>
                            <Flex
                                width={isSmallScreenButton ? '80%' : "100%"}
                                height="full"
                                border={"1px"}
                                borderColor="gray.300"
                                borderRadius={"md"}
                                p="4"
                                flexDirection={"column"}
                                alignItems="center"
                                justifyContent={"center"}
                                gap={2}
                                marginLeft={isSmallScreenButton ? '50px' : '90px'}
                            >
                                <Input
                                    variant={"flushed"}
                                    placeholder="Entrer l'URL"
                                    focusBorderColor="gray.400"
                                    isRequired
                                    errorBorderColor="red"
                                    type={"text"}
                                    _placeholder={{ color: "gray.500" }}
                                    fontSize={20}
                                    ref={inputElement}
                                />
                                <Button
                                    colorScheme={"linkedin"}
                                    width={isSmallScreenButton ? '' : "sm"}
                                    _hover={{ shadow: "lg" }}
                                    fontSize={20}
                                    onClick={() => {
                                        console.log(inputElement?.current?.value);
                                        setUrl(inputElement?.current?.value)
                                    }}
                                    marginTop={'20px'}
                                    textAlign={'center'}
                                >Charger la vidéo</Button>
                                <Button
                                    colorScheme={"linkedin"}
                                    width={isSmallScreenButton ? '' : "sm"}
                                    _hover={{ shadow: "lg" }}
                                    fontSize={20}
                                    onClick={handleLoopButton}
                                    marginTop={'20px'}
                                    textAlign={'center'}
                                >
                                    {!loop ? 'Auto repeat this video' : 'Stop the loop'}
                                </Button>
                            </Flex>
                        </Box>
                    </>}

                </Flex>
                <Hide breakpoint='(max-width: 900px)'>
                    <Flex width={"30%"} position={'relative'} top={'-35px'} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                        {elements && elements.length > 0 && elements[0].id !== 0 ?
                            <>
                                <Box width={"75%"} borderWidth="1px" rounded="md" overflow="hidden">
                                    <Box key={0} px={4} py={2} bg="gray.100" color={'black'} borderBottom={'1px solid'}>
                                        <Flex p={6} w="300px" h="50px" alignItems={'center'} justifyContent="center">
                                            <Text>Playlist</Text>
                                        </Flex>
                                    </Box>
                                    {elements.map((element: any, id: number) => {
                                        return (
                                            <Box key={element.id} px={4} py={2} bg="gray.100" color={'black'} borderBottom={(id !== elements.length - 1) ? '1px solid' : ''} _hover={{ bg: bgBox, color: 'white', textDecoration: 'underline' }}>
                                                <Flex p={6} w="300px" h="50px" justifyContent="space-between" alignItems={'center'}>
                                                    <Text onClick={() => handleSelection(element.id)}>{element.title}</Text>
                                                    <DeleteIcon color="red.500" mr="2" onClick={() => handleRemove(element.id)} />
                                                </Flex>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </> : null}
                    </Flex>
                </Hide>
            </Flex>
        </>
    );
};

export default Feed;