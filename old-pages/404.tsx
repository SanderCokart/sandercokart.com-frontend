import Error from 'next/error';

const _404 = ({ title }: { title: string }) => {
    return <Error statusCode={404} title={title}/>;
};

export default _404;