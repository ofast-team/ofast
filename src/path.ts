export default function buildPath(route : string)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://ofast.io/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}