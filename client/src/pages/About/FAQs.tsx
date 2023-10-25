import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

import './FAQs.css'

export default function FAQs(props: any) {
    return(
        <>
        <Navbar 
            cartTotal={props.cartTotal} 
            setCartTotal={props.setCartTotal}
            stripeCustomerId={props.stripeCustomerId} 
            setStripeCustomerId={props.setStripeCustomerId}
            cartContents={props.cartContents} 
            setCartContents={props.setCartContents} 
            loggedIn={props.loggedIn} 
            setLoggedIn={props.setLoggedIn}
        />
        <div className="contact">
            <div className="w-100 h-75 d-flex justify-content-center align-items-center flex-column">
                <h1 className="header-color">Contact Us!</h1>
                <h5 className="header-color">Send us an Email!</h5>
                <a href="mailto: support@website.com"><p className="paragraph-color">support@website.com</p></a>
                <h5 className="header-color">Call or Text us!</h5>
                <a href="tel: 222-222-2222"><p className="paragraph-color">+1 222-222-2222</p></a>
            </div>
        </div>
        <div id="FAQs" className="container mt-5">
            <h1 className="header-color ms-2">FAQs</h1>
            <ul>
                <li className="h3 header-color">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores maiores ab et numquam sunt fuga officia sint consectetur sed. Minus, suscipit. Praesentium, obcaecati ducimus!</li>
                <li className="answer paragraph-color ms-5">Enim, harum ex, nemo aspernatur numquam nobis libero quis facere magni, exercitationem totam! Iste nisi ullam voluptatibus error odit ipsum temporibus mollitia velit nesciunt ad doloribus minima beatae libero, iure necessitatibus!</li>
                <li className="h3 header-color">Quisquam consequatur quae repellat atque mollitia ad asperiores eaque quibusdam facere numquam incidunt nam consectetur, quod neque laboriosam totam ex alias officia a dolores voluptatem assumenda odit. Itaque rerum eum reiciendis iure!</li>
                <li className="answer paragraph-color ms-5">Hic laborum quo, ipsa quisquam quia eos ipsum facilis. Sunt blanditiis voluptatum neque quia pariatur ad animi maxime quidem. Animi ex fugiat reprehenderit delectus et, dolore tenetur velit quam eum, suscipit totam accusantium perferendis aut rerum voluptas necessitatibus! Fuga earum debitis enim consectetur magnam rem voluptatibus eligendi nesciunt, autem quasi velit ut officiis, sunt voluptates!</li>
                <li className="h3 header-color"> Nesciunt recusandae ipsa expedita nisi corporis ipsam sit voluptas consequatur fuga eveniet quis, officiis nam et nostrum veniam, soluta consectetur fugiat aliquid.</li>
                <li className="answer paragraph-color ms-5">Ducimus minus velit officiis quidem quasi, totam harum hic numquam tenetur molestiae laudantium corporis nobis eligendi, ad ipsam dolorum nisi cupiditate rerum voluptatibus culpa aliquam, dolor sapiente?</li>
                <li className="h3 header-color">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores maiores ab et numquam sunt fuga officia sint consectetur sed. Minus, suscipit. Praesentium, obcaecati ducimus!</li>
                <li className="answer paragraph-color ms-5">Enim, harum ex, nemo aspernatur numquam nobis libero quis facere magni, exercitationem totam! Iste nisi ullam voluptatibus error odit ipsum temporibus mollitia velit nesciunt ad doloribus minima beatae libero, iure necessitatibus!</li>
                <li className="h3 header-color">Quisquam consequatur quae repellat atque mollitia ad asperiores eaque quibusdam facere numquam incidunt nam consectetur, quod neque laboriosam totam ex alias officia a dolores voluptatem assumenda odit. Itaque rerum eum reiciendis iure!</li>
                <li className="answer paragraph-color ms-5">Hic laborum quo, ipsa quisquam quia eos ipsum facilis. Sunt blanditiis voluptatum neque quia pariatur ad animi maxime quidem. Animi ex fugiat reprehenderit delectus et, dolore tenetur velit quam eum, suscipit totam accusantium perferendis aut rerum voluptas necessitatibus! Fuga earum debitis enim consectetur magnam rem voluptatibus eligendi nesciunt, autem quasi velit ut officiis, sunt voluptates!</li>
                <li className="h3 header-color"> Nesciunt recusandae ipsa expedita nisi corporis ipsam sit voluptas consequatur fuga eveniet quis, officiis nam et nostrum veniam, soluta consectetur fugiat aliquid.</li>
                <li className="answer paragraph-color ms-5">Ducimus minus velit officiis quidem quasi, totam harum hic numquam tenetur molestiae laudantium corporis nobis eligendi, ad ipsam dolorum nisi cupiditate rerum voluptatibus culpa aliquam, dolor sapiente?</li>
            </ul>
        </div>
        <div id="returns" className="container mt-5">
            <h1 className="faq-header-2 header-color me-5">Returns</h1>
            <p className="paragraph-color">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis labore ratione maiores repellendus quas enim voluptas id! Quaerat, nesciunt reiciendis dolorem accusantium et dolorum inventore rem omnis neque. Iste nihil aperiam nostrum dolor iusto accusamus. Cupiditate eaque delectus enim? Nulla ad animi fuga numquam dolorum unde, vitae quo ab voluptatibus mollitia commodi quasi eveniet corporis, ratione eum maxime! Deserunt molestiae officia laborum incidunt harum, dolorum soluta ipsum? Magni vero alias debitis, voluptas inventore corporis possimus itaque beatae expedita eum amet ipsa esse dicta necessitatibus nemo temporibus sit eius explicabo modi provident, consectetur odit fugit quia? At, magni aliquid velit odio eligendi, dolore distinctio, impedit placeat vitae blanditiis recusandae corrupti? Ab illo earum necessitatibus suscipit dolorem nisi eum totam, consequuntur commodi velit corporis laboriosam sed voluptatum autem aperiam, cumque animi repellendus nulla. Fuga sapiente labore libero vitae! Porro laboriosam placeat beatae voluptatum, quisquam officia, ipsam quis, aspernatur eum suscipit autem ipsa atque quaerat mollitia harum hic praesentium asperiores architecto! Excepturi sint accusamus eligendi nihil dolorum deleniti illo, omnis soluta modi, voluptatum quasi esse. Possimus cumque rem eos harum rerum, exercitationem pariatur perspiciatis sint velit! Voluptas vero illo a atque laudantium ullam iste similique architecto magni. Quibusdam eum odio magnam quae soluta, delectus at, a facilis laudantium corrupti unde consequatur commodi odit. Aspernatur quisquam nihil asperiores dicta voluptate praesentium cum? Tempora sequi veritatis consequatur nisi rerum eum quod atque quia fuga id labore vitae vel numquam quidem tenetur perspiciatis, modi quos doloribus praesentium. Perferendis exercitationem reprehenderit fugit? Possimus ratione saepe enim, officiis dolore voluptatibus fugiat quae non necessitatibus cumque atque ipsa voluptate ab architecto quod suscipit soluta voluptas itaque esse! Quidem non incidunt culpa at, iure illum animi dolorum, id iste repellendus rerum corporis error assumenda aliquam, asperiores a? Porro voluptates quisquam itaque quis fugit facere dignissimos. Quia, laudantium tenetur! Repellendus, odio eos? Ipsam pariatur ipsum voluptates sit, optio provident. Voluptatem eveniet nihil temporibus, itaque illo autem, sunt optio accusantium doloribus fuga quam! Unde sit laborum sunt odit velit earum aspernatur dignissimos facere! Nobis quisquam et nam veritatis, explicabo dolor in! Nemo beatae, pariatur minus esse veritatis unde velit nesciunt deleniti rem aliquid hic quas facilis et, perferendis explicabo ad perspiciatis illo! Harum ullam quasi, ut natus laborum consequuntur quod beatae! Voluptas quaerat, neque atque quasi voluptatum nemo veniam quo rerum assumenda odio! Quibusdam provident hic nihil laboriosam laborum voluptatem vero explicabo doloribus dolore, quo sapiente ab itaque beatae aperiam placeat dicta facilis incidunt reprehenderit. Adipisci, dolor! Harum perspiciatis natus est. Dolore, maxime ipsa, at earum ad molestiae eligendi ipsam, quaerat nesciunt dicta dolor nisi obcaecati voluptates fugit rem eius. Qui, hic. Mollitia cupiditate dolores ut aperiam hic iste tempore, necessitatibus fuga dolorem exercitationem aliquid veniam delectus culpa provident corporis laudantium maxime sequi rem doloremque. Et cumque dolorum, porro ex esse aliquam sit reprehenderit repellendus vitae quas nam eveniet neque soluta dignissimos quod ut ab veniam deleniti! Molestias quasi quaerat delectus voluptatibus, nam numquam quae quos sunt, tenetur architecto nostrum minus omnis laborum! Maxime sint quis officia saepe fuga accusantium vero temporibus.</p>
        </div>
        <Footer />
        </> 
    )
}