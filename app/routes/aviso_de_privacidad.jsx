export default function Aviso() {
  return (
    <section className="px-10 pt-10 sm:pt-28  pb-72 flex flex-col  min-h-screen items-center ">
      <div className=" bg-light sm:w-1/2 p-10 rounded-xl  pb-16">
        <h1 className=" text-3xl mb-5 font-formulaLight ">
          {' '}
          Aviso de Privacidad{' '}
        </h1>
        <p className=" font-formula  ">
          Este Aviso de Privacidad tiene como objetivo informarte sobre el
          tratamiento que se dará a los datos personales que pudieran ser
          recabados a través del uso de nuestra plataforma.
        </p>
        <p className=" font-formula mt-10 ">
          <strong className="text-xl">Datos Personales Recabados</strong>
        </p>
        <p className=" font-formula mt-10 ">
          {' '}
          Únicamente recabamos y tratamos la información de las placas de
          vehículos que los usuarios deciden compartir voluntariamente al
          utilizar nuestra plataforma para dejar mensajes dirigidos a los
          propietarios de dichas placas.{' '}
        </p>
        <p className=" font-formula mt-10 ">
          {' '}
          <strong className="text-xl">Finalidad del Tratamiento</strong>{' '}
        </p>
        <p className=" font-formula mt-10 ">
          La información de las placas de vehículos es utilizada únicamente para
          mostrar los mensajes dejados por los usuarios dirigidos a los
          propietarios de esas placas. No realizamos ningún tratamiento
          adicional de estos datos ni los compartimos con terceros.{' '}
        </p>
        <p className=" font-formula mt-10 ">
          {' '}
          <strong className="text-xl">Seguridad de los Datos</strong>
        </p>
        <p className=" font-formula mt-10 ">
          {' '}
          Tomamos medidas de seguridad físicas, técnicas y administrativas para
          proteger los datos personales de accesos no autorizados, uso o
          divulgación no autorizados, así como de la alteración, destrucción o
          pérdida de los datos.{' '}
        </p>
        <p className=" font-formula mt-10 ">
          {' '}
          <strong className="text-xl">Derechos ARCO</strong>
        </p>
        <p className=" font-formula mt-10 ">
          {' '}
          En cualquier momento, los usuarios tienen derecho a acceder,
          rectificar, cancelar u oponerse al tratamiento de sus datos
          personales, así como a revocar el consentimiento otorgado para dicho
          tratamiento, mediante el envío de una solicitud por correo electrónico
          a [inserta tu dirección de correo electrónico].
        </p>
        <p className=" font-formula mt-10 ">
          {' '}
          <strong className="text-xl">Cambios al Aviso de Privacidad </strong>
        </p>
        <p className=" font-formula mt-10 ">
          Nos reservamos el derecho de modificar este Aviso de Privacidad en
          cualquier momento. Cualquier cambio será notificado a través de
          nuestra plataforma.
        </p>
      </div>
    </section>
  )
}
