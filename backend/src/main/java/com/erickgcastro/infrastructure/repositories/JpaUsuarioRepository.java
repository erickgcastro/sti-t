
package com.erickgcastro.infrastructure.repositories;

import com.erickgcastro.domain.entities.Usuario;
import com.erickgcastro.domain.repositories.UsuarioRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaUsuarioRepository extends JpaRepository<Usuario, Long>, UsuarioRepository {
    boolean existsByCpf(String cpf);
}
