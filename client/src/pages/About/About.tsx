import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import './About.css'
import React from 'react'

export default function About(props: any) {

    React.useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    return(
        <div>
        <Navbar
            setStripeCustomerInfo={props.setStripeCustomerInfo}
            cartTotal={props.cartTotal} 
            setCartTotal={props.setCartTotal}
            stripeCustomerId={props.stripeCustomerId} 
            setStripeCustomerId={props.setStripeCustomerId}
            cartContents={props.cartContents} 
            setCartContents={props.setCartContents} 
            loggedIn={props.loggedIn} 
            setLoggedIn={props.setLoggedIn}
            showNotification={props.showNotification}
        />
        <div id="story" className="navbar-margin container">
            <h1 className="mb-3">Our Story</h1>
            <hr/>
                    <p className="paragraph">
                    <picture>
                    <source
                        type="image/avif"
                        srcSet={`
                        https://res.cloudinary.com/ddv5jvvvg/image/upload/f_avif,w_250/v1698194055/ourstory1_y8zrnw.avif 250w,
                        https://res.cloudinary.com/ddv5jvvvg/image/upload/f_avif,w_500/v1698194055/ourstory1_y8zrnw.avif 500w,
                        https://res.cloudinary.com/ddv5jvvvg/image/upload/f_avif,w_750/v1698194055/ourstory1_y8zrnw.avif 750w
                        `}
                        sizes="(max-width: 768px) 100vw, 50vw" />
                    <source
                        type="image/webp"
                        srcSet={`
                        https://res.cloudinary.com/ddv5jvvvg/image/upload/f_webp,w_250/v1698194055/ourstory1_y8zrnw.webp 250w,
                        https://res.cloudinary.com/ddv5jvvvg/image/upload/f_webp,w_500/v1698194055/ourstory1_y8zrnw.webp 500w,
                        https://res.cloudinary.com/ddv5jvvvg/image/upload/f_webp,w_750/v1698194055/ourstory1_y8zrnw.webp 750w
                        `}
                        sizes="(max-width: 768px) 100vw, 50vw" />
                    <img className="paragraph-image-1 img-fluid" width="500" height="500"
                        src="https://res.cloudinary.com/ddv5jvvvg/image/upload/f_auto,w_500/v1698194055/ourstory1_y8zrnw.png"
                        alt="Our Team Working on Shirts!" />
                    </picture>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo veritatis adipisci animi laudantium nesciunt dolores nam aliquid doloremque fugiat quae, asperiores hic minus cum obcaecati, odio dolorem quaerat, autem totam ipsam! Ratione magni facere voluptatum, incidunt laboriosam accusamus praesentium officiis non illo provident adipisci illum nisi aut. Laboriosam reprehenderit facilis rerum illo nobis, fugit assumenda. Totam labore ab placeat error laboriosam quasi sequi dignissimos saepe ipsum sunt nihil cum rerum facilis temporibus optio velit dolore dicta quas, voluptatibus molestias fuga deserunt aperiam veritatis ratione? Corrupti enim nobis vitae itaque nesciunt, debitis deserunt possimus harum veritatis. Distinctio deserunt accusantium non, illo explicabo dicta eos deleniti nesciunt iusto similique! Natus quia eius optio possimus, amet non aliquid alias commodi libero. In, temporibus tempore ad cum praesentium exercitationem ducimus molestias, esse ipsam iusto, dolorum expedita nostrum obcaecati. Quibusdam odio doloribus porro laudantium sit voluptatem? Similique exercitationem dignissimos harum dolorum id provident obcaecati sit velit quibusdam non animi quae at blanditiis maiores accusamus enim, pariatur magni itaque sed soluta voluptate eaque nobis incidunt! Accusantium, soluta! Nisi laborum, omnis obcaecati provident impedit, id consequatur nulla, officia vero repudiandae ipsa soluta quod voluptatibus est aliquam excepturi iste velit at! Porro corporis tempora esse ipsum cum, sed laudantium vitae atque, eos placeat culpa, inventore molestiae dolor voluptate voluptas? Quis dolores cumque inventore consectetur similique iste commodi iure ut quasi dolore. Magni harum maiores ad corporis consectetur, ea delectus, quis iste, vitae eligendi facere natus. Fugit cum reiciendis, veniam nihil laudantium sint beatae voluptatem earum, dolore tenetur animi! Voluptatibus ducimus commodi nisi dolore quas sequi placeat. Laborum nihil necessitatibus mollitia rem sapiente natus blanditiis eveniet repellat ipsum impedit itaque, provident saepe? Tenetur, incidunt. Ut culpa sapiente placeat excepturi rerum magnam voluptatem. Ea, veniam vitae laboriosam, repellendus excepturi quas deleniti magni beatae mollitia reprehenderit cumque, esse magnam! Sit facilis porro autem maiores numquam rerum ex fugit amet cum, quia nesciunt nam velit nulla atque cupiditate veniam reiciendis qui minus perspiciatis voluptatum dolorem mollitia corrupti quis. Quod expedita debitis rerum reprehenderit molestias sit enim repudiandae omnis inventore velit asperiores, quis deserunt beatae ipsam error aspernatur maxime! Ipsam animi, quod officia illum, itaque rerum nam illo totam exercitationem modi ducimus? Ipsum veniam aspernatur officiis exercitationem pariatur expedita, accusantium suscipit! Voluptate ut quod, minima in laborum dignissimos officiis illo quae facere, voluptatibus soluta mollitia velit! Sed recusandae a animi eos nam quam impedit at dolore voluptates consequatur exercitationem quae, illo quisquam autem minus deserunt perspiciatis reiciendis sunt. Totam corporis quo ipsam sed mollitia facilis laudantium, dignissimos beatae eum ex perferendis a eaque saepe exercitationem iure dolor perspiciatis optio, doloremque porro sunt veniam cum ea error? Doloribus molestias ullam harum unde assumenda! Labore, fugit consequuntur deserunt nostrum facere eveniet reiciendis perspiciatis soluta error aspernatur accusamus dolorum rerum. Excepturi illo debitis optio quia omnis fuga accusamus ipsam incidunt quod repudiandae tempore quidem maiores, laudantium, nesciunt, eligendi deleniti aliquid velit? Animi tenetur ut voluptate aut natus quis! Ducimus provident impedit iure et aliquam voluptas odio porro magni voluptates corrupti possimus aspernatur, quibusdam pariatur voluptatem blanditiis.</p> 
                    <hr/>
            </div>

        <div id="ourMaterials" className="mt-5 container">
            <h1 className="mb-3">Our Materials</h1>
            <hr/>
            <p className="paragraph">
            <picture>
            <source
                type="image/avif"
                srcSet={`
                https://res.cloudinary.com/ddv5jvvvg/image/upload/f_avif,w_250/v1698195865/ourstory2_zg4bv9.avif 250w,
                https://res.cloudinary.com/ddv5jvvvg/image/upload/f_avif,w_500/v1698195865/ourstory2_zg4bv9.avif 500w,
                https://res.cloudinary.com/ddv5jvvvg/image/upload/f_avif,w_750/v1698195865/ourstory2_zg4bv9.avif 750w
                `}
                sizes="(max-width: 768px) 100vw, 50vw" />
            <source
                type="image/webp"
                srcSet={`
                https://res.cloudinary.com/ddv5jvvvg/image/upload/f_webp,w_250/v1698195865/ourstory2_zg4bv9.webp 250w,
                https://res.cloudinary.com/ddv5jvvvg/image/upload/f_webp,w_500/v1698195865/ourstory2_zg4bv9.webp 500w,
                https://res.cloudinary.com/ddv5jvvvg/image/upload/f_webp,w_750/v1698195865/ourstory2_zg4bv9.webp 750w
                `}
                sizes="(max-width: 768px) 100vw, 50vw" />
            <img className="paragraph-image-2 img-fluid" width="500" height="500"
                src="https://res.cloudinary.com/ddv5jvvvg/image/upload/f_auto,w_500/v1698195865/ourstory2_zg4bv9.png"
                alt="Our Materials!" />
            </picture>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis odit fuga iste ut iusto nesciunt architecto nam repellendus exercitationem tempore, reiciendis atque porro laboriosam libero ab enim, accusamus cumque debitis ipsa? Dignissimos, dolorem repudiandae soluta nemo perspiciatis atque, delectus tempore dicta laudantium molestias, natus officiis voluptatem rem nulla blanditiis quae ut. Ipsum tenetur sunt laborum? Ipsam minus incidunt vitae corporis doloribus error quasi, aperiam quisquam modi? Iure, hic! Ullam tempora, nam ducimus sapiente necessitatibus ratione labore recusandae quisquam ea nesciunt ipsa, doloribus animi ipsam odit natus adipisci exercitationem illo aliquam qui dolorum quam eius totam. Voluptatem at fuga expedita qui veniam ratione laudantium! Nulla unde aperiam ipsam nam eum aut aliquid facere doloremque, maxime possimus animi harum iusto similique iure voluptates sed vero quas! Quod iste quos neque accusamus illo, et labore adipisci cum ducimus nam saepe explicabo quaerat voluptates debitis esse itaque eaque. Beatae repellat libero veniam ipsam, deleniti ullam quo minima est quisquam accusantium impedit deserunt similique illum fugiat adipisci eligendi esse maiores illo animi suscipit voluptate iste ratione. Culpa eos, nulla unde commodi sit natus repellendus quidem nam dolorem rerum, accusantium quos id. Alias, consequuntur odio. Similique voluptate neque animi voluptatum natus vitae quae odit incidunt nemo. Magni fugit corporis enim dolores, consequatur id perspiciatis facilis omnis quibusdam ab reprehenderit neque explicabo quis voluptatem repellat sunt placeat molestiae magnam eveniet pariatur! Voluptas suscipit enim amet, ipsa officiis laboriosam officia accusantium incidunt voluptates, deleniti ullam, eligendi ex et! Amet, officia delectus. Fugiat, esse. Maxime fuga incidunt exercitationem voluptates assumenda, numquam voluptatibus quidem aperiam non molestias laborum ipsum culpa libero minima tempora aliquam ducimus delectus, ab consectetur sunt cum! Excepturi voluptatibus, aliquam hic perspiciatis ut quas delectus exercitationem deleniti, sunt dolorem alias consectetur pariatur, nobis sit id fugiat earum facere error soluta magni cupiditate. Repudiandae, cum, ratione dolorum eaque molestiae minus veniam voluptas et accusantium, ipsam nihil impedit quasi dolor. Et optio voluptatum, blanditiis commodi accusamus fugiat odio quis voluptates repudiandae sunt tenetur quo, voluptatem amet ipsum est nemo aliquid sed dignissimos eius dolores nam! Ipsum quo ullam sint recusandae amet, soluta nihil, ratione corporis dolorem eum labore perferendis facere excepturi minus commodi doloribus tempora sapiente accusantium eos minima ad iure expedita deleniti animi! Excepturi voluptatibus ut cumque commodi perspiciatis autem culpa accusantium natus iste dignissimos, accusamus corrupti dolor delectus totam ipsam assumenda. Rem culpa optio non exercitationem alias ea quo aliquam sed reiciendis esse voluptate reprehenderit ullam natus aliquid mollitia voluptatem ad quidem, saepe temporibus voluptatibus. Dolorem odit suscipit rem eum. Quisquam reprehenderit ducimus, natus esse at, nesciunt iste quis ratione optio minus, est recusandae molestiae voluptate omnis cupiditate architecto aliquam? Ullam corporis quas cum aut vitae quis itaque ducimus nisi minus, ipsa temporibus qui eum laborum ea consequuntur commodi libero odit optio dignissimos. Odio, inventore nisi. Deserunt dicta, nisi facere est ducimus omnis aut ut iure similique dignissimos molestias ea officiis, quidem aliquam numquam rem commodi velit doloribus alias consequatur ullam eum. Quas nulla eligendi culpa quam, ipsa et, praesentium sequi commodi ab minus illo error consequuntur.</p>
            <hr/>
            </div>
        <Footer />
        </div>
    )
}