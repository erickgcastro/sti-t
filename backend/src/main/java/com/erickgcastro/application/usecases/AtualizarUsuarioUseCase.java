
package com.erickgcastro.application.usecases;

import com.erickgcastro.domain.entities.Usuario;
import com.erickgcastro.domain.repositories.UsuarioRepository;
import com.erickgcastro.domain.services.EnderecoService;
import com.erickgcastro.domain.valueobjects.Endereco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AtualizarUsuarioUseCase {
    
    private final UsuarioRepository usuarioRepository;
    private final EnderecoService enderecoService;
    
    @Autowired
    public AtualizarUsuarioUseCase(UsuarioRepository usuarioRepository, EnderecoService enderecoService) {
        this.usuarioRepository = usuarioRepository;
        this.enderecoService = enderecoService;
    }
    
    public Usuario executar(Long id, Usuario usuarioAtualizado) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);
        if (usuarioExistente.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        
        Usuario usuario = usuarioExistente.get();
        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setCep(usuarioAtualizado.getCep());
        // usuario.setNumero(usuarioAtualizado.getNumero());
        usuario.setComplemento(usuarioAtualizado.getComplemento());
        
        if (!usuario.getCep().equals(usuarioAtualizado.getCep())) {
            Endereco endereco = enderecoService.consultarEnderecoPorCep(usuarioAtualizado.getCep());
            if (endereco != null) {
                usuario.atualizarEndereco(
                    endereco.getLogradouro(),
                    endereco.getBairro(),
                    endereco.getCidade(),
                    endereco.getUf()
                );
            }
        }
        
        return usuarioRepository.save(usuario);
    }
}
