import React from 'react' 

import zapIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/56613389?s=460&u=2207ae8ae295ea2817c52a06b3c5230620b72063&v=4" alt="Fábio Papais" />
                <div>
                    <strong>Fábio Papais</strong>
                    <span>Matemática</span>
                </div>
            </header>

            <p>
                Entusiasta das melhores tecnologias JS.
                <br /><br />
                Apaixonado por tecnologia e inovação
            </p>

            <footer>
                <p>
                    Preço/Hora
                            <strong>R$ 50,00</strong>
                </p>
                <button type="button">
                    <img src={zapIcon} alt="Celular" />
                            Entrar em contato
                        </button>
            </footer>
        </article>
    )
}

export default TeacherItem
