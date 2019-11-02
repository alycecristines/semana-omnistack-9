import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import './styles.css';
import camera from '../../assets/camera.svg';

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]
    );

    async function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}
                >
                    <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
                    <img src={camera} alt="select imagem" />
                </label>

                <label htmlFor="company">EMPRESA *</label>
                <input 
                    id="company"
                    placeholder="Sua empresa incrível"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                />

                <label htmlFor="techs">TECNOLOGIAS * (separadas por vírgula)</label>
                <input 
                    id="techs"
                    placeholder="Quais tecnologias usam?"
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />

                <label htmlFor="price">VALOR DA DIÁRIA * (em branco para GRATUITO)</label>
                <input 
                    id="price"
                    placeholder="Valor cobrado por dia"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />

                <button type="submit" className="btn">Cadastrar</button>
            </form>
        </>
    )
}