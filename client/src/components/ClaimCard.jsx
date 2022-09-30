import { useClaimContext } from '../context/ClaimProvider.contex'
import { useNavigate } from 'react-router-dom';

function ClaimCard({claim}) {
  const {  } = useClaimContext();
  const navigate = useNavigate();
  console.log(claim)
  return (
    <div>
      {/* <h2>{claim.id_claim}</h2> */}
      {/* <p>{claim.description}</p> */}
      <button>Borrar</button>
      <button>Actualizar</button>
    </div>
  );
};

export default ClaimCard;